import { FC } from 'react';
import Post from '../Post';

import './style.css';

const PostsContainer:FC = () => (
  <div className="posts-containers">
    <Post />
    <Post />
    <Post />
  </div>
);

export default PostsContainer;
