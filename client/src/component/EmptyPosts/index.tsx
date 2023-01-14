import { FC, useContext } from 'react';

import Footer from '../Footer';
import { IEmptyPostProps } from '../../interfaces';
import { AuthContext } from '../../context/AuthContext';
import './style.css';

const EmptyPosts :FC<IEmptyPostProps> = ({
  icon, title, content, isPost, userId,
}) => {
  const data = useContext(AuthContext);
  return (
    <div className="empty-posts-container">
      <div>
        <div className="camera-container">
          <img src={icon} alt="camera" />
        </div>
        <h1 className="title-empty-posts">
          {data?.user?.id
        === userId ? title : 'No Posts Yet'}

        </h1>
        {data?.user?.id === userId ? (
          <>
            <p className="empty-posts-desc">
              {content}
            </p>
            {isPost && <p className="share-photo-empty-post">Share your first photo</p>}
          </>
        )
          : null }
      </div>
      <Footer />
    </div>
  );
};

export default EmptyPosts;
