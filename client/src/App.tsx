import { FC } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Sidebar } from './component';

const {
  Content, Sider,
} = Layout;

const App:FC = () => (
  <Layout>
    <Sider style={{
      backgroundColor: '#fff',
      height: '100vh',
      position: 'fixed',
      zIndex: '1000',
    }}
    >
      <Sidebar />
    </Sider>
    <Content>
      <Outlet />
    </Content>
  </Layout>
);

export default App;
