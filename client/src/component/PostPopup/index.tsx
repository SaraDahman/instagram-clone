/* eslint-disable no-unused-vars */
import { FC } from 'react';
import Modal from 'react-modal';
import { Avatar } from 'antd';
import { CommentOutlined, MoreOutlined, SendOutlined } from '@ant-design/icons';
import MediaSlider from '../MediaSlider';
import { LikeIcon, SaveIcon } from '../Post/icons';
import Comment from './Comment';
import './style.css';

const media = [
  'https://images.pexels.com/photos/5702958/pexels-photo-5702958.jpeg',
  'https://images.pexels.com/photos/5945570/pexels-photo-5945570.jpeg',
  'https://images.pexels.com/photos/13522191/pexels-photo-13522191.jpeg',
  'https://images.pexels.com/photos/6159139/pexels-photo-6159139.jpeg',
];

const PosPopUp:FC<{isOpen: boolean, setIsOpen:(val:boolean)=>void}> = ({ isOpen, setIsOpen }) => {
  const handleCancel = ():any => {
    setIsOpen(false);
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
      <div className="pop-up">
        <MediaSlider media={media} className="popup-slider" />

        <div className="popup-details">
          {/* section 1 */}
          <div className="user-avatar">
            <Avatar src={media[0]} className="avatar" />
            <p>Sara Dahman</p>
            <MoreOutlined className="icon" />
          </div>

          {/* section 2 */}
          <div className="comments">

            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />

          </div>
          {/* --- */}
          <div className="icons">
            {LikeIcon(true, () => console.log('like'))}
            <CommentOutlined />
            <SendOutlined />
            {SaveIcon(true, () => console.log('save'))}
          </div>

        </div>
      </div>
    </Modal>
  );
};

export default PosPopUp;
