import { FC, useState } from 'react';
import { EllipsisOutlined, SmileOutlined } from '@ant-design/icons';
import {
  Input, Divider, Button, Dropdown,
} from 'antd';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import MediaSlider from '../MediaSlider';
import UserInfo from '../UserInfo';
import { SaveIcon, LikeIcon, CommentIcon } from './icons';
import './style.css';
import EmojiPicker from '../EmojiPicker';
import { IPost } from '../../interfaces';

const Post:FC<{post : IPost}> = ({ post }) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <EmojiPicker setComment={setComment} />
      ),
    },
  ];

  const handleLike = ():void => {
    setIsLiked(!isLiked);
  };

  const handleSave = ():void => {
    setIsSaved(!isSaved);
  };

  const handleOpenChange = (e:boolean):void => {
    setOpen(e);
  };

  return (
    <div className="post" key={post.id}>
      <div className="post-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to={`/${post.username}`}>

            <UserInfo username={post.username} image={post.image} />
          </Link>
          <p className="post-date">• 11h</p>
        </div>
        <EllipsisOutlined className="post-options" />
      </div>
      <MediaSlider media={post.media} />

      <div className="post-operations">
        <div>
          {LikeIcon(isLiked, handleLike)}
          {CommentIcon()}
        </div>
        {SaveIcon(isSaved, handleSave)}
      </div>
      <p className="likes-count">
        {post.likes}
        {' '}
        Likes
      </p>
      <p className="caption">
        <span className="username">{post.username}</span>
        {post.caption}
      </p>

      <p className="comments-count">
        View all
        {' '}
        {Number(post.comments) || ''}
        {' '}
        comments
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Input
          placeholder="add a comment..."
          bordered={false}
          style={{ padding: '5px 0' }}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        {
        comment && <Button type="link">Post</Button>
      }

        <Dropdown
          menu={{ items }}
          placement="topLeft"
          open={open}
          onOpenChange={handleOpenChange}
          arrow={{ pointAtCenter: true }}
          overlayClassName="emoji-drop-down"
        >
          <SmileOutlined />
        </Dropdown>
      </div>

      <Divider />
    </div>
  );
};

export default Post;
