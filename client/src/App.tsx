import { FC, useState } from 'react';
import './App.css';
import './component/Sidebar/style.css';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Sidebar } from './component';
import { AuthProvider } from './context/AuthContext';

const {
  Content, Sider,
} = Layout;

const App:FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthProvider>
      <Layout>
        <Sider
          style={{
            backgroundColor: '#fff',
            height: '100vh',
            position: 'sticky',
            top: '0',
            left: '0',
          }}
          breakpoint="xl"
          collapsed={collapsed}
          onBreakpoint={(broken) => {
            if (broken) setCollapsed(true);
            else setCollapsed(false);
          }}
        >
          <Sidebar />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </AuthProvider>
  );
};

export default App;
