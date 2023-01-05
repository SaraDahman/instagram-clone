import { FC } from 'react';

import { footerLinks } from '../../data/FoorterLinks';
import cameraIcon from '../../assets/images/camera.png';
import './style.css';

const EmptyPosts :FC = () => (
  <div className="empty-posts-container">
    <div>
      <div className="camera-container">
        <img src={cameraIcon} alt="camera" />
      </div>
      <h1 className="title-empty-posts">Share photos</h1>
      <p className="empty-posts-desc">
        When you share photos, they will appear on your profile.
      </p>
      <p className="share-photo-empty-post">Share your first photo</p>
    </div>
    <footer className="footer-profile">
      {footerLinks.map((link) => (<p>{link}</p>))}
    </footer>
  </div>
);

export default EmptyPosts;
