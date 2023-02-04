import { FC, useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import InfiniteScroll from 'react-infinite-scroll-component';
import message from 'antd/lib/message';

import Post from '../Post';
import { ApiService } from '../../services';
import AllPostsSeenMessage from '../AllPostsSeenMessage';
import Loading from '../Loading/Index';

import './style.css';
import { IPost } from '../../interfaces';

const PostsContainer:FC = () => {
  const [posts, setPosts] = useState<any>([]);
  const [comment, setComment] = useState([]);
  const [postFound, setPostsFound] = useState(0);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchPosts = async ():Promise<void> => {
    try {
      setLoading(posts.length <= 0);
      const response = await ApiService.get(`/api/v1/posts/${offset}`);
      const { data, comments, postsFound } = response.data;
      setLoading(false);
      setPosts([...posts, ...data]);
      setComment(comments);
      setPostsFound(postsFound);
      setOffset(offset + 3);
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong, Please try again later');
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
        posts.map((post:IPost, i:number) => (
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
