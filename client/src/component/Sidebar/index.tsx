import { FC, createElement } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import sidebarContent from './sidebarContent';
import './style.css';

const items: MenuProps['items'] = sidebarContent.map((item, i) => ({
  key: `sub${i}`,
  icon: createElement(item.icon),
  label: item.label,
}));

const Sidebar:FC = () => (
  <div className="menu">
    <Menu
      mode="inline"
      items={items}
      className="sub-menu"
    />
  </div>
);

export default Sidebar;
