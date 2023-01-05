/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { Tabs } from 'antd';

import EmptyPosts from '../EmptyPosts';
import { tabsItem } from '../../data/TabsItem';
import ProfilePosts from '../ProfilePosts/ProfilePosts';
import './style.css';

const UserProfile: React.FC = () => {
  // This just an initial step, It must change later
  const [isAuth] = useState<boolean>(true);
  const [tabWidth, setTabWidth] = useState<number>(50);
  // initial State
  const [userPosts] = useState<any>([]);
  const [items, setItems] = useState(tabsItem);

  useEffect(() => {
    if (!isAuth) {
      setItems(items.filter((item) => item.key !== 'Saved'));
      setTabWidth(60);
    }
  }, [isAuth]);

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
          tabBarStyle={{ borderTop: '#dbdbdb 0.4px solid' }}
          items={items}
        />
      </div>
      { userPosts.length ? <EmptyPosts />
        : (<ProfilePosts />
        )}

    </div>
  );
};

export default UserProfile;
