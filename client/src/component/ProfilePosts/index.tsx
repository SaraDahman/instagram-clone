import { FC } from 'react';

import { v4 as uuidv4 } from 'uuid';

import Loading from '../Loading/Index';
import { IProfilePosts } from '../../interfaces';
import './style.css';

const ProfilePosts:FC <{isPostsLoading: boolean,
  posts:IProfilePosts[] }> = ({ isPostsLoading, posts }) => {
    const renderedPosts = posts.map((post) => (
      <div className="single-posts" key={uuidv4()}>
        <img className="images-posts-profile" src={post.media[0]} alt="post" />
      </div>
    ));

    const rowsNumber = posts.length / 3;
    let i = 0;
    const renderRows = [];
    while (rowsNumber >= i) {
      const start = i * 3; // Start from 0 then increase three by three
      const end = i * 3 + 3;
      renderRows.push(
        <div className="profile-row-posts" key={uuidv4()}>
          {renderedPosts.slice(start, end)}
        </div>,
      );
      i += 1;
    }
    if (isPostsLoading) return <Loading />;
    return (
      <div className="profile-all-posts-container">
        {renderRows}
      </div>
    );
  };

export default ProfilePosts;
