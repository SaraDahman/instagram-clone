import { FC } from 'react';
import ImageSlider from '../imageSlider';
import './style.css';

const media = [
  'https://images.pexels.com/photos/5945570/pexels-photo-5945570.jpeg',
  'https://images.pexels.com/photos/13522191/pexels-photo-13522191.jpeg',
  'https://images.pexels.com/photos/6159139/pexels-photo-6159139.jpeg'];

const Post:FC = () => (
  <div className="post">
    <div>Post</div>
    <ImageSlider media={media} />
  </div>
);

export default Post;
