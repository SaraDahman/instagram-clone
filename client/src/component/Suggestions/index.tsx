import { FC, useContext } from 'react';

import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

import { AuthContext } from '../../context/AuthContext';
import { userData } from '../../data/FakeUsersData';
import './style.css';

const Suggestions :FC = () => {
  const loggedUser = useContext(AuthContext);
  return (
    <div className="suggestions-container">
      <section className="suggestions-current-user-container">
        <div className="current-user-box">
          { loggedUser?.user?.username && (
          <Link to={loggedUser?.user?.username}>
            <Avatar
              className="current-user-avatar"
              src={loggedUser?.user?.image}
              alt="user-avatar"
            />
          </Link>
          ) }

          <div className="current-username-box">
            { loggedUser?.user?.username && (
            <Link to={loggedUser?.user?.username} className="current-username">
              {loggedUser?.user?.username}
            </Link>
            ) }
            <p className="current-name">{loggedUser?.user?.name}</p>
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
};

export default Suggestions;
