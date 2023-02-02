import { FC, createElement, useContext } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  InstagramOutlined,
  HomeOutlined,
  HeartOutlined,
  SearchOutlined,
  MessageOutlined,
  PlusCircleOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/insta-logo.png';
import { AuthContext } from '../../context';
import { JwtService } from '../../services';
import './style.css';

const Sidebar:FC<{setIsModalOpen:Function}> = ({ setIsModalOpen }) => {
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const sidebarContent = [
    {
      icon: InstagramOutlined,
      label: <img src={logo} alt="instagram logo" className="logo-img" />,
      onclick: () => navigate('/'),
    },
    {
      icon: HomeOutlined,
      label: 'Home',
      onclick: () => navigate('/'),
    },
    {
      icon: SearchOutlined,
      label: 'Search',
      onclick: () => {},
    },
    {
      icon: MessageOutlined,
      label: 'Message',
      onclick: () => {},

    },
    {
      icon: HeartOutlined,
      label: 'Notifications',
      onclick: () => {},

    },
    {
      icon: PlusCircleOutlined,
      label: 'Create',
      onclick: () => setIsModalOpen(true),

    },
    {
      icon: UserOutlined,
      label: 'Profile',
      onclick: () => navigate(`/${user?.user?.username}`),

    },
    {
      icon: MenuOutlined,
      label: 'More',
      onclick: () => {},
      className: 'more',
      children: [
        {
          label: 'Settings',
          key: 'settings',
          onClick: () => navigate('/accounts/edit/'),
        },
        {
          label: 'Saved',
          key: 'saved',
        },
        {
          label: 'Log out',
          key: 'logout',
          onClick: () => {
            JwtService.removeToken();
            navigate('/sign-in');
          },
        },
      ],
    },
  ];

  const items: MenuProps['items'] = sidebarContent.map((item, i) => ({
    key: `sub${i}`,
    icon: createElement(item.icon),
    label: item.label,
    onClick: item.onclick,
    children: item.children,
    className: item.className || '',
  }));

  return (
    <div className="menu">
      <Menu
        mode="inline"
        items={items}
        className="sub-menu"
      />
    </div>
  );
};

export default Sidebar;
