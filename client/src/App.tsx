import { FC } from 'react';
import './App.css';
import PostsContainer from './component/PostsContainer';
import Stories from './component/stories';

const App:FC = () => (
  <div className="App">
    <Stories />
    <PostsContainer />
  </div>
);

export default App;
