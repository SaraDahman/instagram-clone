/* eslint-disable max-len */
import { FC } from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { IFollower } from '../../interfaces';

const Person:FC<{item : IFollower}> = ({ item }) => (
  <div className="person">
    <Avatar
      src={item.image}
      className="avatar"
    />
    <div>
      <Link to={`/${item.username}`}>
        <p className="username">{item.username}</p>
      </Link>
      <p className="name">{item.name}</p>
    </div>
    <button type="button">Button</button>
  </div>
);

export default Person;
