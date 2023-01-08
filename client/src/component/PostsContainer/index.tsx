/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FC, useEffect, useState } from 'react';
import Post from '../Post';
import { ApiService } from '../../services';

import './style.css';

const PostsContainer:FC = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
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

  if (loading) return <h1>Loading ...</h1>;
  return (
    <div className="posts-containers">
      {posts.map((post, i) => <Post post={post} comments={comment[i]} key={i} />)}
    </div>
  );
};

export default PostsContainer;
