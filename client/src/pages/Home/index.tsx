import { FC } from 'react';
import { PostsContainer, Stories, Suggestions } from '../../component';

const Home:FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div>
      <Stories />
      <PostsContainer />
    </div>
    <Suggestions />
  </div>
);

export default Home;
