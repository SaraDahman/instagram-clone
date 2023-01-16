import { FC } from 'react';
import { Avatar } from 'antd';

const Comment:FC<{
  username:string | undefined,
  image:string | undefined,
  comment:string | undefined,
}> = ({ username, image, comment }):any => (
  <div className="popup-caption">
    <Avatar
      src={image}
      className="avatar"
    />
    <p>
      <strong>
        {username}
        {' '}
      </strong>
      {comment}
      <p className="time">1d</p>
    </p>
  </div>
);

export default Comment;
