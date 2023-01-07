/* eslint-disable react/jsx-closing-tag-location */
import { FC } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Images } from '../../data/FakeUserProfilePosts';
import './style.css';

const ProfilePosts: FC = () => {
  const renderedPosts = Images.map((image) => (
    <div className="single-posts" key={uuidv4()}>
      <img className="images-posts-profile" src={image} alt="post" />
    </div>
  ));

  const rowsNumber = Images.length / 3;
  let i = 0;
  const renderRows = [];
  while (rowsNumber >= i) {
    const start = i * 3; // Start from 0 then increase three by three
    const end = i * 3 + 3;
    renderRows.push(<div
      className="profile-row-posts"
      key={uuidv4()}
    >
      {renderedPosts.slice(start, end)}
    </div>);
    i += 1;
  }
  return (
    <div className="profile-all-posts-container">
      {renderRows}
    </div>
  );
};

export default ProfilePosts;
