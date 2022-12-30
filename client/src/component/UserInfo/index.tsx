import { Avatar } from 'antd';
import { FC } from 'react';
import './style.css';

const UserInfo:FC = () => (
  <div className="user-info">
    <Avatar
      className="user-avatar"
      src="https://images.pexels.com/photos/6159139/pexels-photo-6159139.jpeg"
    />
    <p className="username">mostafa.4omar</p>
  </div>
);

export default UserInfo;
