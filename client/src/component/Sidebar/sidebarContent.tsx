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

import logo from '../../assets/insta-logo.png';

const sidebarContent = [
  {
    icon: InstagramOutlined,
    label: <img src={logo} alt="instagram logo" className="logo-img" />,
  },
  {
    icon: HomeOutlined,
    label: 'Home',
  },
  {
    icon: SearchOutlined,
    label: 'Search',
  },
  {
    icon: MessageOutlined,
    label: 'Message',
  },
  {
    icon: HeartOutlined,
    label: 'Notifications',
  },
  {
    icon: PlusCircleOutlined,
    label: 'Create',
  },
  {
    icon: UserOutlined,
    label: 'Profile',
  },
  {
    icon: MenuOutlined,
    label: 'More',
  },
];

export default sidebarContent;
