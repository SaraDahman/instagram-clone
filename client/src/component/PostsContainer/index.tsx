import { FC, useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import Post from '../Post';
import { ApiService } from '../../services';
import Loading from '../Loading/Index';
import './style.css';

const PostsContainer:FC = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async ():Promise<void> => {
    try {
      setLoading(true);
      const response = await ApiService.get('/api/v1/posts');
      const { data, comments } = response.data;
      setLoading(false);
      setPosts(data);
      setComment(comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="posts-containers">
      {posts.map((post, i) => <Post post={post} comments={comment[i]} key={uuidv4()} />)}
    </div>
  );
};

export default PostsContainer;
