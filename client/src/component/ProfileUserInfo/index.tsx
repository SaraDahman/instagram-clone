/* eslint-disable max-len */
import { FC } from 'react';

import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
// import { AuthContext } from '../../context';

import './style.css';

const ProfileUserInfo: FC = () => (
  <div style={{
    // border: '1px solid red',
    width: '60%',
    marginLeft: '15%',
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    gap: '80px',
  }}
  >
    <img
      style={{
        width: '165px',
        height: '165px',
        borderRadius: '50%',
      }}
      src="https://media.npr.org/assets/img/2022/11/01/gettyimages-1189806758_custom-0a0266b3e82cfd9a1bb6016795a1a51b87277273.jpg"
      alt=""
    />
    <div style={{
      // border: '1px solid blue',
      width: '80%',
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      alignItems: 'flex-start',
    }}
    >
      <div style={{
        // border: '1px solid red',
        display: 'flex',
        width: '60%',
        justifyContent: 'flex-start',
        gap: '25px',
        alignItems: 'center',
      }}
      >
        <h1 className="username-profile-userInfo">mohammed</h1>
        <Button
          style={{
            color: 'black',
            fontWeight: '500',
          }}
          className="edit-profile-btn"
        >
          Edit Profile

        </Button>
        <button
          type="button"
          aria-label="edit"
          style={{
            border: 'none', backgroundColor: 'inherit', width: '40px', fontSize: '25px',
          }}
        >
          <SettingOutlined />

        </button>
      </div>
      <div style={{
        // border: '1px solid red',
        display: 'flex',
        width: '65%',
        justifyContent: 'flex-start',
        gap: '30px',
        alignItems: 'center',
        fontSize: '16px',
        fontWeight: '400',
      }}
      >
        <p>0 posts</p>
        <p>18 followers</p>
        <p>30 following</p>

      </div>
      <p>
        Shadé Zahrai Official
        Public figure
        💪Award-Winning Peak-Performance specialist to Fortune 500s
        ⭐️1 Million+ Learners on LinkedIn Learning
        📚PhD Candidate

      </p>
      {' '}

    </div>

  </div>
);

export default ProfileUserInfo;
