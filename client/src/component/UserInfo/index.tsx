import { Avatar } from 'antd';
import { FC } from 'react';
import './style.css';

const UserInfo:FC<{username:string, image:string}> = ({ username, image }) => (
  <div className="user-info">
    <Avatar
      className="user-avatar"
      src={image}
    />
    <p className="username">{username}</p>
  </div>
);

export default UserInfo;
