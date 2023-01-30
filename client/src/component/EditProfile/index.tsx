/* eslint-disable no-unused-vars */
import {
  FC, useContext, useRef, useState,
} from 'react';
import {
  Button, Avatar, Input, Spin,
} from 'antd';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context';
import { ApiService } from '../../services';

import './style.css';

const { TextArea } = Input;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const EditProfile:FC = () => {
  const authUser = useContext(AuthContext);
  const fileInputRef = useRef<any>(null);
  const [newAvatar, setNewAvatar] = useState<string|undefined>(authUser?.user?.image);
  const [bio, setBio] = useState<string|undefined>(authUser?.user?.bio);
  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClick = ():void => {
    fileInputRef.current.click();
  };

  const handleUploadImage = async (e:any):Promise<void> => {
    setLoader(true);
    const formData = new FormData();

    formData.append('file', e.target.files[0]);
    try {
      const { data } = await ApiService.post('/api/v1/upload/image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewAvatar(data.image);
      setLoader(false);
    } catch (err:any) {
      toast.error('Failed to upload the image');
      setLoader(false);
    }
  };

  const handleEditProfile = async ():Promise<void> => {
    const newDataObj:any = {};
    if (newAvatar) {
      newDataObj.image = newAvatar;
    }
    if (bio) {
      newDataObj.bio = bio;
    }

    try {
      const result = await ApiService.patch(`/api/v1/user/${authUser?.user?.id}`, newDataObj);
      toast.success(result.data.message);
      navigate(`/${authUser?.user?.username}`);
    } catch (err:any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="edit-profile-container">
      <h3>Edit Profile</h3>
      <div className="edit-profile-form">
        <div
          className="edit-avatar"
        >
          <div className="avatar-container">
            <Avatar className="img" src={newAvatar} />
            {loader && <Spin className="spin" indicator={antIcon} />}
          </div>
          <div>
            <p>
              {authUser?.user?.username}
            </p>
            <Button
              style={{ padding: 0 }}
              onClick={handleClick}
              type="link"
            >
              Change profile photo
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              accept=".jpg,.jpeg,.png"
              style={{ display: 'none' }}
              onChange={handleUploadImage}
            />
          </div>
        </div>

        <TextArea
          showCount
          maxLength={150}
          style={{ height: 120, resize: 'none', marginTop: '30px' }}
          onChange={(e) => setBio(e.target.value)}
          placeholder="disable resize"
          value={bio}
        />

        <Button
          type="primary"
          style={{ marginTop: '20px' }}
          onClick={handleEditProfile}
        >
          submit
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
