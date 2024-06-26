import React from 'react';
import { Layout, Button, theme } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import '../styles/siderbar.css';
import Logo from './sidebarcomponents/Logo';
import MenuList from './sidebarcomponents/MenuList';
const { Header, Sider } = Layout;
const SideBar = ({ collapsed, toggle }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ position: "fixed", zIndex: "2" }}>
            <Sider collapsed={collapsed}
                collapsible
                trigger={null}
                className='sidebar'>
                <Logo />
                <MenuList />
            </Sider>
            <Layout>
                {<Button className='toggle' onClick={toggle} type='text' icon={collapsed && <MenuUnfoldOutlined style={{ fontSize: "2rem", color: "white" }} />} />}
            </Layout>
        </Layout>
    );
};

export default SideBar;