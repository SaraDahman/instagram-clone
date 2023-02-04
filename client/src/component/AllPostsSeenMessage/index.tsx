import { FC } from 'react';

import { Divider } from 'antd/lib';

import image from '../../assets/images/allSeen.png';

import './style.css';

const AllPostsSeenMessage: FC = () => (
  <div className="all-seen-post-container">
    <Divider />
    <img width={85} src={image} alt="" />
    <p className="first-para"> You&#39;ve completely caught up </p>
    <p style={{ color: '#8E8E8E' }}> You&#39;ve seen all new posts from the past 3 days.</p>
    <Divider />
  </div>
);

export default AllPostsSeenMessage;
