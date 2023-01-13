import {
  FC, useContext, useEffect, useState,
} from 'react';

import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';

import EmptyPosts from '../EmptyPosts';
import Saved from '../Saved';
import ProfileUserInfo from '../ProfileUserInfo';
import ProfilePosts from '../ProfilePosts';
import { tabsItem } from './TabsItem';
import { ApiService } from '../../services/ApiService';
import { AuthContext } from '../../context/AuthContext';
import { IProfileData } from '../../interfaces';
import cameraIcon from '../../assets/images/camera.png';
import './style.css';

const UserProfile: FC = () => {
  const data = useContext(AuthContext);
  const [tabWidth, setTabWidth] = useState<number>(50);

  const [userPosts] = useState<any>([]);
  const [items, setItems] = useState(tabsItem);
  const [activeKey, setActiveKey] = useState<string>('Posts');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IProfileData|null>(null);
  const { username } = useParams();

  const fetchUserData = async ():Promise<void> => {
    try {
      setIsLoading(true);
      const response = await ApiService.get(`/api/v1/user/${username}`);
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data?.user?.id) {
      setItems(items.filter((item) => item.key !== 'Saved'));
      setTabWidth(100);
    }
    fetchUserData();
  }, []);

  if (isLoading) return <h1>Loading</h1>;

  const handleOnChange = (key:string):void => {
    if (key === 'Posts' || key === 'Saved') setActiveKey(key);
  };

  return (
    <div className="profile-container">
      <ProfileUserInfo user={user} />
      <div className="tabs-container">
        <Tabs
          className="tabs-slider"
          size="middle"
          tabBarGutter={tabWidth}
          defaultActiveKey="1"
          tabPosition="bottom"
          centered
          onChange={handleOnChange}
          tabBarStyle={{ borderTop: '#dbdbdb 0.4px solid' }}
          items={items}
        />
      </div>
      { activeKey === 'Posts'
        ? !userPosts.length ? (
          <EmptyPosts
            icon={cameraIcon}
            content="When you share photos, they will appear on your profile"
            title="Share photos"
            isPost
          />
        )
          : <ProfilePosts />
        : <Saved />}

    </div>
  );
};

export default UserProfile;
