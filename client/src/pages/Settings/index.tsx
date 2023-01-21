import React, { FC } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import {
  EditOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { Outlet, useNavigate } from 'react-router-dom';

import './style.css';

const { Content, Sider } = Layout;

const Settings:FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const LayoutItems: MenuProps['items'] = [
    {
      icon: UserOutlined,
      path: '',
      label: 'Edit Profile',
    },
    {
      icon: EditOutlined,
      path: '',
      label: 'Change Password',
    },

    {
      icon: NotificationOutlined,
      path: '',
      label: 'Help',
    },

  ].map((item) => ({
    key: uuidv4(),
    icon: React.createElement(item.icon),
    label: item.label,
    onClick: () => { navigate(item.path); },
  }));

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div>
        <Layout className="settings-layout" style={{ background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={LayoutItems}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </div>
    </div>
  );
};

export default Settings;
