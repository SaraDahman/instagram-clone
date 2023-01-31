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
import { IProfileData, IProfilePosts } from '../../interfaces';
import Loading from '../Loading/Index';
import cameraIcon from '../../assets/images/camera.png';
import './style.css';

const UserProfile: FC = () => {
  const [userPosts, setUserPosts] = useState<IProfilePosts[]>([]);
  const [user, setUser] = useState<IProfileData | null>(null);
  const data = useContext(AuthContext);
  const [tabWidth, setTabWidth] = useState<number>(50);
  const [items, setItems] = useState(tabsItem);
  const [activeKey, setActiveKey] = useState<string>('Posts');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false);
  const { username } = useParams();

  const fetchUserData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await ApiService.get(`/api/v1/user/${username}`);
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchUserPosts = async (): Promise<void> => {
    try {
      setIsPostsLoading(true);
      const response = await ApiService.get(`/api/v1/posts/profile/${username}`);
      setUserPosts(response.data);
      setIsPostsLoading(false);
    } catch (error) {
      setIsPostsLoading(false);
    }
  };
  const checkAuth = async ():Promise<void> => {
    if (data?.user?.id === user?.id) {
      setItems(items.filter((item) => item.key !== 'Saved'));
      setTabWidth(100);
    }
  };

  useEffect(() => {
    const handleRequest = async ():Promise<void> => {
      await fetchUserData();
      await checkAuth();
      await fetchUserPosts();
    };
    handleRequest();
  }, [username]);

  if (isLoading) return <Loading />;

  const handleOnChange = (key: string): void => {
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
      {activeKey === 'Posts'
        ? !userPosts.length ? (
          <EmptyPosts
            icon={cameraIcon}
            content="When you share photos, they will appear on your profile"
            title="Share photos"
            isPost
            userId={user?.id}
          />
        )
          : <ProfilePosts isPostsLoading={isPostsLoading} posts={userPosts} />
        : <Saved />}

    </div>
  );
};

export default UserProfile;
