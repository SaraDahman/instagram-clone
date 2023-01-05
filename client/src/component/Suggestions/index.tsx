import { FC } from 'react';

import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

import { userData } from '../../data/FakeUsersData';
import './style.css';

const Suggestions :FC = () => (
  <div className="suggestions-container">
    <section className="suggestions-current-user-container">
      <div className="current-user-box">
        <Link to="username">
          <Avatar
            className="current-user-avatar"
            src="https://images.pexels.com/photos/6159139/pexels-photo-6159139.jpeg"
            alt="user-avatar"
          />
        </Link>

        <div className="current-username-box">
          <Link to="username" className="current-username"> mah1mm2ad </Link>
          <p className="current-name">Mohammed Omar</p>
        </div>
      </div>
      <p className="suggestions-switch-follow">Switch</p>
    </section>

    <section className="suggestions-for-you-box">
      <p className="suggestion-for-you-text"> Suggestions For You</p>
      <p className="seeAll">See All</p>
    </section>

    <section className="suggestions-other-user-container">
      {
      userData.slice(0, 5).map((user:any) => (
        <div className="suggestions-one-user" key={user.id}>
          <div className="other-user-box">
            <Avatar
              className="other-user-avatar"
         // eslint-disable-next-line max-len
              src={user.image}
              alt={user.name}
            />
            <div className="other-user-box-name">
              <Link to={user.name} className="other-username">{user.name}</Link>
              <p className="other-user-info"> Followed by Shamshom and 3 more</p>
            </div>
          </div>
          <p className="suggestions-switch-follow">Follow</p>

        </div>
      ))
}
    </section>
  </div>
);

export default Suggestions;
