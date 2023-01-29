/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-unused-vars */
import { FC, useState, useEffect } from 'react';
import Modal from 'react-modal';
import {
  Avatar, Dropdown, MenuProps, Input,
} from 'antd';
import {
  CommentOutlined, MoreOutlined, SendOutlined, SmileOutlined,
} from '@ant-design/icons';
import MediaSlider from '../MediaSlider';
import { LikeIcon, SaveIcon } from '../Post/icons';
import { ApiService } from '../../services';
import { IComment, IPostDetails } from '../../interfaces/IPostDetails';
import EmojiPicker from '../EmojiPicker';
import Comment from './Comment';
import './style.css';

const PosPopUp:FC<{
  isOpen: boolean, setIsOpen:(val:boolean)=>void, id:string
}> = ({ isOpen, setIsOpen, id }) => {
  const { TextArea } = Input;

  const [comment, setComment] = useState<string>('');
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [post, setPost] = useState<IPostDetails | null>(null);
  const [allComments, setAllComments] = useState<IComment[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data: { data, comments } } = await ApiService.get(`/api/v1/posts/${id}`);
        setPost(data);
        setAllComments(comments);

        setLoading(false);
      } catch (error) {
        console.log(error, 'error in fetching one post');
      }
    };
    if (isOpen) {
      fetchPost();
    }
  }, [id, isOpen]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <EmojiPicker setComment={setComment} />
      ),
    },
  ];

  const handleCancel = ():any => {
    setIsOpen(false);
  };

  const handleEmojiOpenChange = ():any => {
    setOpenEmoji(!openEmoji);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCancel}
      style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          width: '70%',
          position: 'static',
          padding: 'auto',
          overflow: 'visible',
        },
      }}
    >
      {loading || !post ? (<h1>Loading</h1>) : (
        <div className="pop-up">
          <MediaSlider media={post.media} className="popup-slider" />

          <div className="popup-details">
            {/* section 1 */}
            <div className="user-avatar">
              <Avatar src={post.user.image} className="avatar" />
              <p>{post.user.username}</p>
              <MoreOutlined className="icon" />
            </div>

            {/* section 2 */}
            <div className="comments">

              <Comment
                username={post.user.username}
                image={post.user.image}
                comment={post?.caption}
              />
              {allComments?.map((e) => (
                <Comment
                  username={e.user?.username}
                  image={e.user?.image}
                  comment={e?.comment}
                />
              ))}

            </div>
            {/* --- */}
            <div className="icons">
              {LikeIcon(false, () => console.log('like'))}
              <CommentOutlined />
              <SendOutlined />
              {SaveIcon(false, () => console.log('save'))}
            </div>
            {/*  */}

            <div className="likes-count">
              <Avatar
                src={post.likes[0].user.image}
                className="avatar"
              />
              <p>
                Liked by
                {' '}
                <strong>{post.likes[0].user.username}</strong>
                {' '}
                and
                {' '}
                <strong>
                  {post.likes.length - 1}
                  {' '}
                  others
                </strong>
              </p>
            </div>
            {/*  */}

            <div className="add-comment">
              <Dropdown
                menu={{ items }}
                placement="topLeft"
                open={openEmoji}
                onOpenChange={handleEmojiOpenChange}
                arrow={{ pointAtCenter: true }}
                overlayClassName="emoji-drop-down"
              >
                <SmileOutlined />
              </Dropdown>
              <TextArea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="add a comment .."
                autoSize={{ minRows: 1, maxRows: 1 }}
                className="text-area"
              />
              <button type="button" className={comment || 'disable'}>Post</button>
            </div>
            {/*  */}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PosPopUp;
