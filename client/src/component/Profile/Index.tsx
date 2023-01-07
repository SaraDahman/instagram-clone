import React, { useEffect, useState } from 'react';

import { Tabs } from 'antd';

import EmptyPosts from '../EmptyPosts';
import Saved from '../Saved';
import { tabsItem } from './TabsItem';
import ProfilePosts from '../ProfilePosts';
import cameraIcon from '../../assets/images/camera.png';
import './style.css';

const UserProfile: React.FC = () => {
  // This just an initial step, It must change later
  const [isAuth] = useState<boolean>(true);
  const [tabWidth, setTabWidth] = useState<number>(50);
  // initial State
  const [userPosts] = useState<any>([]);
  const [items, setItems] = useState(tabsItem);
  const [activeKey, setActiveKey] = useState<string>('Posts');

  useEffect(() => {
    if (!isAuth) {
      setItems(items.filter((item) => item.key !== 'Saved'));
      setTabWidth(60);
    }
  }, [isAuth]);

  const handleOnChange = (key:string):void => {
    if (key === 'Posts' || key === 'Saved') setActiveKey(key);
  };

  return (
    <div className="profile-container">
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
