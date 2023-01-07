import { FC } from 'react';

import Footer from '../Footer';
import { IEmptyPostProps } from '../../interfaces';
import './style.css';

const EmptyPosts :FC<IEmptyPostProps> = ({
  icon, title, content, isPost,
}) => (
  <div className="empty-posts-container">
    <div>
      <div className="camera-container">
        <img src={icon} alt="camera" />
      </div>
      <h1 className="title-empty-posts">{title}</h1>
      <p className="empty-posts-desc">
        {content}
      </p>
      {isPost && <p className="share-photo-empty-post">Share your first photo</p>}
    </div>
    <Footer />
  </div>
);

export default EmptyPosts;
