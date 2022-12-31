import { FC, createElement } from 'react';
import { Menu } from 'antd';
import { InstagramOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import sidebarContent from './sidebarContent';
import logo from '../../assets/insta-logo.png';
import './style.css';

const items: MenuProps['items'] = sidebarContent.map((item, i) => ({
  key: `sub${i}`,
  icon: createElement(item.icon),
  label: item.label,
}));

const Sidebar:FC = () => (
  <div className="menu">
    <div className="logo-container">
      <InstagramOutlined className="logo-icon" />
      <img src={logo} alt="instagram logo" className="logo-img" />
    </div>
    <Menu
      mode="inline"
      items={items}
      className="sub-menu"
    />
  </div>
);

export default Sidebar;
