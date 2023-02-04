import { FC, useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { message } from 'antd/lib';
import InfiniteScroll from 'react-infinite-scroll-component';

import Post from '../Post';
import { ApiService } from '../../services';
import { CacheService } from '../../services/CacheServices';
import { IPost, IComment } from '../../interfaces';
import AllPostsSeenMessage from '../AllPostsSeenMessage';
import Loading from '../Loading/Index';

import './style.css';

const PostsContainer: FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [comment, setComment] = useState<IComment[]>([]);
  const [postFound, setPostsFound] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchPostsFromApi = async (): Promise<void> => {
    try {
      setLoading(posts.length <= 0);
      const response = await ApiService.get(`/api/v1/posts/${offset}`);
      const { data, comments, postsFound } = response.data;
      setPosts([...posts, ...data]);
      setComment(comments);
      setPostsFound(postsFound);
      setOffset(offset + 3);
      setLoading(false);
      CacheService.setDataInCache({
        comments, posts: data, offset, postsFound,
      });
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong, Please try again later');
    }
  };
  // eslint-disable-next-line no-unused-vars
  const fetchPosts = ():void => {
    const cachedData = CacheService.getDataFromCache(offset);
    if (!cachedData) {
      console.log('api request')

      fetchPostsFromApi();
    } else {
      console.log('chach')
      setPosts([...posts, ...cachedData.allPostsData.posts]);
      setComment(cachedData.allPostsData.comments);
      setOffset(cachedData.allPostsData.offset + 3);
      setPostsFound(cachedData.allPostsData.postsFound);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="posts-containers">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={posts.length < postFound}
        loader={<Loading />}
        scrollThreshold={0.5}
        endMessage={<AllPostsSeenMessage />}
      >
        {
          posts.map((post: IPost, i: number) => (
            <Post
              post={post}
              comments={comment[i]}
              key={uuidv4()}
            />
          ))
        }
      </InfiniteScroll>
    </div>
  );
};

export default PostsContainer;
