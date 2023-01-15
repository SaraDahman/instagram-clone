import { FC } from 'react';
import { Avatar } from 'antd';

const Comment:FC = ():any => (
  <div className="popup-caption">
    <Avatar
      src="https://images.pexels.com/photos/5702958/pexels-photo-5702958.jpeg"
      className="avatar"
    />
    <p>
      <strong>Sara Dahman </strong>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Saepe sit tenetur aliquam eos totam unde deleniti assumenda
      molestiae quis, quod voluptate. Omnis officia exercitationem,
      eveniet natus culpa aliquam eaque fugit.
    </p>
  </div>
);

export default Comment;
