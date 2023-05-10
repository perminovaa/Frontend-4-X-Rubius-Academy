
import {  Link, Navigate, Outlet} from 'react-router-dom';
import './App.css';
import Layout, { Content, Header, Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Menu, MenuProps, theme } from "antd";
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

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
      getItem('Заявки', '1', <Link to="/"></Link>, [
      getItem('Список заявок', '2', <Link to="/"></Link>),
      getItem('Создать заявку', '3',<Link to="/CreateOrder"></Link>),

    ]),
      getItem('Сотрудники', '4', <Link to="/employees" ></Link>),
  ];

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
        
        {isLoggedIn && ( <> <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
          <Menu className='nav'
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        />
        <div style={{margin: "20px"}}>
          <Button onClick={logout}  style={{width: '150px', textAlign: 'center', marginTop: '100px'}}>Выход</Button>
        </div>
        </>
        )}
          
        </Sider>
        <Content style={{minHeight: "80vh", margin: '20px'}}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}><Outlet /></div>
        </Content>

        <Sider></Sider>
      </Layout>
      <Footer style={{ textAlign: 'right', backgroundColor: 'whitesmoke'}}>Мир Красоты ©2023 /PerminovaA</Footer>
    </Layout> 
  </>
}

export default App;


