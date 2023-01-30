/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  FC, useState, useEffect, useContext,
} from 'react';
import Modal from 'react-modal';
import {
  Avatar, Dropdown, MenuProps, Input, message,
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
import { AuthContext } from '../../context';
import Loading from '../Loading/Index';

const PosPopUp:FC<{
  isOpen: boolean, setIsOpen:Function, id:string
}> = ({ isOpen, setIsOpen, id }) => {
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<IPostDetails | null>(null);
  const [allComments, setAllComments] = useState<IComment[]>([]);
  const [deletedComments, setDeletedComments] = useState<string[]>([]);

  const [comment, setComment] = useState<string>('');
  const [newComments, setNewComments] = useState<IComment[]>([]);

  const userAuth = useContext(AuthContext);

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
    setNewComments([]);
    setIsOpen(false);
  };

  const handleEmojiOpenChange = ():any => {
    setOpenEmoji(!openEmoji);
  };

  const handleAddComments = async ():Promise<void> => {
    if (comment.trim() !== '') {
      try {
        const result = await ApiService.post(`/api/v1/comments/${id}`, { comment });
        setComment('');
        setNewComments([...newComments, { ...result.data.data, user: userAuth?.user }]);
      } catch (error:any) {
        message.error(error.response.data.message);
      }
    }
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
          height: '650px',
          position: 'static',
          padding: 'auto',
          overflow: 'visible',
        },
      }}
      ariaHideApp={false}
    >
      {loading || !post ? (<Loading />) : (
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

              { allComments.concat(newComments)
                ?.filter((e) => !deletedComments.includes(e.id)).map((e) => (
                  <Comment
                    username={e.user?.username}
                    image={e.user?.image}
                    comment={e?.comment}
                    createdAt={e?.createdAt}
                    setDeletedComments={setDeletedComments}
                    id={e?.id}
                    postId={e?.id}
                    userId={e?.userId}
                    key={e?.id}
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
              {post.likes.length ? (
                <div className="like">
                  <Avatar
                    src={post.likes[0].user.image}
                    className="avatar"
                  />
                  <p>
                    Liked by
                    {' '}
                    <strong>
                      {post.likes[0].user.username}
                      {' '}
                    </strong>
                    {' '}
                    {post.likes.length - 1 ? (
                      <>
                        and
                        {' '}
                        <strong>
                          {post.likes.length - 1}
                          {' '}
                          others
                        </strong>
                      </>
                    ) : ''}
                  </p>
                </div>
              ) : <p>no one liked this post yet</p>}
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
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="add a comment .."
                className="text-area"
                bordered={false}
              />
              <button
                type="button"
                onClick={handleAddComments}
                className={comment || 'disable'}
              >
                Post
              </button>
            </div>
            {/*  */}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PosPopUp;
