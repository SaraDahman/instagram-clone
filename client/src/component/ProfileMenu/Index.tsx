import React, { useState } from 'react';
import { Menu } from 'antd';

const ProfilePosts: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState('posts');
  const handleSelectedItem = (e:any): void => {
    setSelectedItem(e.key);
  };
  const borderTop = '2px solid #1890ff';

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={[selectedItem]}
      onSelect={handleSelectedItem}
    >
      <Menu.Item
        key="posts"
        style={{ borderTop: selectedItem === 'posts' ? borderTop : 'none' }}
      >
        Posts
      </Menu.Item>
      <Menu.Item key="saved">
        Saved
      </Menu.Item>
      <Menu.Item key="tagged">
        Tagged
      </Menu.Item>
    </Menu>
  );
};

export default ProfilePosts;
