import { EllipsisOutlined } from '@ant-design/icons';
import { FC } from 'react';
import MediaSlider from '../MediaSlider';
import UserInfo from '../UserInfo';
import './style.css';

const media = [
  'https://images.pexels.com/photos/5702958/pexels-photo-5702958.jpeg',
  'https://images.pexels.com/photos/5945570/pexels-photo-5945570.jpeg',
  'https://images.pexels.com/photos/13522191/pexels-photo-13522191.jpeg',
  'https://images.pexels.com/photos/6159139/pexels-photo-6159139.jpeg',
];

const Post:FC = () => (
  <div className="post">
    <div className="post-header">
      <UserInfo />
      <EllipsisOutlined className="post-options" />
    </div>
    <MediaSlider media={media} />
  </div>
);

export default Post;
