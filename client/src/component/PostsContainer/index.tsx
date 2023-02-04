import { FC, useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { message } from 'antd/lib';

import Post from '../Post';
import { ApiService } from '../../services';
import { CacheService } from '../../services/CacheServices';
import { IPost, IComment } from '../../interfaces';
import Loading from '../Loading/Index';
import './style.css';

const PostsContainer:FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [comment, setComment] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async ():Promise<void> => {
    try {
      setLoading(true);
      const response = await ApiService.get('/api/v1/posts');
      const { data, comments } = response.data;
      CacheService.setDataInCache({ posts: data, comments });
      setLoading(false);
      setPosts(data);
      setComment(comments);
    } catch (error) {
      message.error('Something went wrong..');
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = CacheService.getDataFromCache();
    if (!cachedData) {
      fetchPosts();
    } else {
      setPosts(cachedData.posts);
      setComment(cachedData.comments);
      setLoading(false);
    }
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="posts-containers">
      {posts.map((post, i) => <Post post={post} comments={comment[i]} key={uuidv4()} />)}
    </div>
  );
};

export default PostsContainer;
