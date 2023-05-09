
import {  Link, Navigate, Outlet} from 'react-router-dom';
import './App.css';
import Layout, { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Menu, theme } from "antd";
import { Button } from 'antd/es/radio';
import { useAuth } from './contexts/AuthContext';
import { useEffect } from 'react';



function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { isLoggedIn, logout, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to='/login'/>;
  }
  
  return <>
    <Layout>
      <Header className='header' ><p className='headerText'>МИР КРАСОТЫ</p></Header>
      
      <Layout >
        <Sider className='sider'
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
        
        {isLoggedIn && ( <>
          <Menu className='nav'
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              
              label: <Link to="/">Заявки</Link>,
            },
            {
              key: '2',
              
              label: <Link to="/employees" >Сотрудники</Link>
            },
            
          ]}
        />
        <div style={{margin: "20px"}}>
          <Button onClick={logout}  style={{width: '150px', textAlign: 'center', marginTop: '100px'}}>Выход</Button>
        </div>
        </>
        )}
          
        </Sider>
        <Content style={{minHeight: "95vh", margin: '20px'}}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}><Outlet /></div>
        </Content>

        <Sider> </Sider>
      </Layout>
    </Layout> 
  </>
}

export default App;


