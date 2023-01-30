import { FC, useContext, useState } from 'react';
import { EllipsisOutlined, SmileOutlined } from '@ant-design/icons';
import {
  Input, Divider, Button, Dropdown, message,
} from 'antd/lib';
import type { MenuProps } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import MediaSlider from '../MediaSlider';
import UserInfo from '../UserInfo';
import { SaveIcon, LikeIcon, CommentIcon } from './icons';
import './style.css';
import EmojiPicker from '../EmojiPicker';
import { IPost } from '../../interfaces';
import PostPopUp from '../PostPopup';
import { ApiService } from '../../services';
import { AuthContext } from '../../context';

const Post:FC<{post : IPost, comments: {id: string, comments:string}}> = ({ post, comments }) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [newComments, setNewComments] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userAuth = useContext(AuthContext);

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

  const showModal = ():void => {
    setIsModalOpen(true);
  };

  const handleAddComments = async ():Promise<void> => {
    if (comment.trim() !== '') {
      try {
        const result = await ApiService.post(`/api/v1/comments/${post.id}`, { comment });
        setComment('');
        setNewComments([...newComments, result.data.data.comment]);
      } catch (error:any) {
        message.error(error.response.data.message);
      }
    }
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
      <MediaSlider media={post.media} className="img-slider" />

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

      <button className="comments-count" onClick={showModal} type="button">
        View all
        {' '}
        {Number(comments.comments) || ''}
        {' '}
        comments
      </button>

      {newComments.length
        ? newComments.map((ele:string) => (
          <p className="caption" key={uuidv4()}>
            <span className="username">{userAuth?.user?.username}</span>
            {ele}
          </p>
        )) : null}
      <div className="input-btn-add-comment">
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
        comment && <Button onClick={handleAddComments} type="link">Post</Button>
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
      <PostPopUp isOpen={isModalOpen} setIsOpen={setIsModalOpen} id={post.id} />
    </div>
  );
};

export default Post;
