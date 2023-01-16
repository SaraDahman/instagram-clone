import { FC, useContext } from 'react';

import { Button } from 'antd';
import { SettingOutlined, DownOutlined } from '@ant-design/icons';
import { IUserInfoProps } from '../../interfaces/IUserInfoProps';

import { AuthContext } from '../../context/AuthContext';
import userImage from '../../assets/images/user.png';
import './style.css';

const ProfileUserInfo: FC<IUserInfoProps> = ({ user }) => {
  const loggedUser = useContext(AuthContext);
  return (
    <div className="user-data-container-profile">
      <img src={user?.image || userImage} alt={user?.name} />
      <div className="user-info-section">

        <div className="first-row">
          <h1>{user?.name}</h1>
          <Button
            style={{ width: user?.id === loggedUser?.user?.id ? '100px' : '140px' }}
            className="edit-profile-btn"
          >
            { user?.id === loggedUser?.user?.id ? 'Edit Profile' : 'Following' }
            { user?.id === loggedUser?.user?.id ? null : <DownOutlined />}
          </Button>
          <button type="button" aria-label="edit" className="setting-button">
            <SettingOutlined />
          </button>
        </div>

        <div className="second-row">
          <p>
            {user?.posts}
            {' '}
            Posts
          </p>
          <p>
            {user?.followers}
            {' '}
            Followers
          </p>
          <p>
            {user?.followings}
            {' '}
            Following
          </p>
        </div>

        {
                // If this was the profile of the logged user and there is no bio,
                // It will display the name of the user,
                // But if it was a profile of other users and there is no bio, nothing will be shown
        user?.id === loggedUser?.user?.id
          ? user?.bio ? <p>{user.bio}</p> : <p>{user?.name}</p>
          : user?.bio && (
          <p className="bio">
            {user?.bio}
          </p>
          )
}
      </div>
    </div>
  );
};

export default ProfileUserInfo;
