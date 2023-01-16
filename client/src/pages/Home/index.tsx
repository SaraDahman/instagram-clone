import { FC } from 'react';
import {
  PostsContainer, Stories, Suggestions, AddPosts,
} from '../../component';

const Home:FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ffffff' }}>
    <div>
      <Stories />
      <AddPosts />
      <PostsContainer />
    </div>
    <Suggestions />
  </div>
);

export default Home;
