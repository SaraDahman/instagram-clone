import { FC, useState } from 'react';

import { Image } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { HeartFilled, CommentOutlined } from '@ant-design/icons';

import Loading from '../Loading/Index';
import { IProfilePosts } from '../../interfaces';
import './style.css';

const ProfilePosts:FC <{isPostsLoading: boolean,
  posts:IProfilePosts[] }> = ({ isPostsLoading, posts }) => {
    const [hoveredPostId, setHoveredPostId] = useState<number>(0);
    const renderedPosts = posts.map((post) => (
      <div className="single-posts" key={uuidv4()}>
        {
        hoveredPostId === +post.id
          ? (
            <div className="hover-icons">
              <CommentOutlined />
              <p>{post.comments || 0}</p>
              <HeartFilled />
              <p>{post.likesCount || 0}</p>
            </div>
          ) : null
}
        <Image
          preview={{ mask: true, visible: false }}
          className="images-posts-profile"
          src={post.media[0]}
          alt="post"
          onMouseOver={() => {
            setHoveredPostId(+post.id);
          }}
          onMouseLeave={() => {
            setHoveredPostId(0);
          }}
        />
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
