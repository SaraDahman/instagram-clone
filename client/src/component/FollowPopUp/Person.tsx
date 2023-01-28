/* eslint-disable max-len */
import { FC } from 'react';
import { Avatar } from 'antd';

const Person:FC = () => (
  <div className="person">
    <Avatar
      src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
      className="avatar"
    />
    <div>
      <p className="username">sara.dahman8</p>
      <p className="name">سرسر</p>
    </div>
    <button type="button">Button</button>
  </div>
);

export default Person;
