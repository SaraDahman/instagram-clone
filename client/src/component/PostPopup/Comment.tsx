import { FC, useContext, useState } from 'react';
import {
  Avatar, Button, List, Modal,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { EllipsisOutlined } from '@ant-design/icons';
import { ApiService } from '../../services';
import { AuthContext } from '../../context';
import { ICommentProps } from '../../interfaces/ICommentProps';

const Comment:FC<ICommentProps> = ({
  username, image, comment, createdAt, setDeletedComments, id, postId, userId,
}) => {
  const navigate = useNavigate();
  const date = new Date(createdAt);
  const userAuth = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = ():void => {
    setIsModalOpen(true);
  };

  const handleCancel = ():void => {
    setIsModalOpen(false);
  };

  const handleDeleteComment = async ():Promise<void> => {
    const result = await ApiService.delete(`/api/v1/comments/${id}/post/${postId}`);
    if (result.status === 200) {
      setDeletedComments((prev:number[]) => [...prev, id]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="popup-caption">
      <Avatar
        src={image}
        className="avatar"
        onClick={() => navigate(`/${username}`)}
      />
      <div>
        <Link
          style={{ fontWeight: 500, fontSize: '14px', paddingRight: '5px' }}
          to={`/${username}`}
        >
          {username}
        </Link>
        <p style={{ display: 'inline', fontSize: '15px' }}>{comment}</p>
        <div
          className="time-options"
        >
          <p className="time">{formatDistanceToNow(date)}</p>
          {userId === userAuth?.user?.id ? <EllipsisOutlined onClick={showModal} /> : null}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        footer={[]}
        onCancel={handleCancel}
        style={{ top: 300 }}
        width="400px"
        className="comments-options"
      >
        <List>
          <List.Item
            onClick={handleDeleteComment}
            style={{ cursor: 'pointer' }}
          >
            <Button
              type="link"
              style={{ margin: '0 auto', color: '#Ed4956', fontWeight: '500' }}
            >
              Delete
            </Button>
          </List.Item>

          <List.Item
            onClick={handleCancel}
            style={{ cursor: 'pointer' }}
          >
            <Button
              type="link"
              style={{ margin: '0 auto', color: '#262626', fontWeight: '500' }}
            >
              Cancel
            </Button>
          </List.Item>
        </List>
        {' '}

      </Modal>
    </div>
  );
};

export default Comment;
