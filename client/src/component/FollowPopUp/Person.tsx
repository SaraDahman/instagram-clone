/* eslint-disable max-len */
import { FC } from 'react';
import { Avatar } from 'antd';
import { IFollower } from '../../interfaces';

const Person:FC<{item : IFollower}> = ({ item }) => (
  <div className="person">
    <Avatar
      src={item.image}
      className="avatar"
    />
    <div>
      <p className="username">{item.username}</p>
      <p className="name">{item.name}</p>
    </div>
    <button type="button">Button</button>
  </div>
);

export default Person;
