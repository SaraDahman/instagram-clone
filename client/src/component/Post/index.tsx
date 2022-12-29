import { FC, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Input, Divider } from 'antd';
import MediaSlider from '../MediaSlider';
import UserInfo from '../UserInfo';
import { SaveIcon, LikeIcon, CommentIcon } from './icons';
import './style.css';

const media = [
  'https://images.pexels.com/photos/5702958/pexels-photo-5702958.jpeg',
  'https://images.pexels.com/photos/5945570/pexels-photo-5945570.jpeg',
  'https://images.pexels.com/photos/13522191/pexels-photo-13522191.jpeg',
  'https://images.pexels.com/photos/6159139/pexels-photo-6159139.jpeg',
];

const Post:FC = () => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = ():void => {
    setIsLiked(!isLiked);
  };

  const handleSave = ():void => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="post">
      <div className="post-header">
        <UserInfo />
        <EllipsisOutlined className="post-options" />
      </div>
      <MediaSlider media={media} />

      <div className="post-operations">
        <div>
          {LikeIcon(isLiked, handleLike)}
          {CommentIcon()}
        </div>
        {SaveIcon(isSaved, handleSave)}
      </div>
      <p className="likes-count">19,020 Likes</p>
      <p className="caption">
        <span className="username">mostafa.4omar</span>
        2022: BEST MOMENTS
      </p>

      <p className="comments-count">
        View all
        {' '}
        {652}
        {' '}
        comments
      </p>

      <Input placeholder="add a comment..." bordered={false} style={{ padding: '5px 0' }} />
      <Divider />
    </div>
  );
};

export default Post;
