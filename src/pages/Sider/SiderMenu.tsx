import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import {
    BarChartOutlined,
    UserOutlined,
    UnorderedListOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import "./index.css";

const SiderMenu = () => {
    const [collapsed, setcollapsed] = useState(false);
    const { pathname } = useLocation();
    console.log(pathname);
    const setfold = () => {
        setcollapsed(!collapsed);
    };
    const sideritems = [
        {
            key: '/',
            icon: <BarChartOutlined />,
            label: '可视化',
            path: "/"
        },
        {
            key: '/user',
            icon: <UserOutlined />,
            label: '用户管理',
            path: "/user"

        },
        {
            key: '/setting',
            icon: <UnorderedListOutlined />,
            label: '设置',
            path: "/setting"
        },
    ];
    return (
        <Sider trigger={null} collapsible collapsed={collapsed} theme={"light"} breakpoint={"lg"} >
            <div className="logo">
                <span>this is logo</span>
            </div>
            <div className="menu">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    selectedKeys={[pathname]}
                >
                    {
                        sideritems.map(e => {
                            return (
                                <Menu.Item key={e.key} icon={e.icon}>
                                    {e.label}
                                    <NavLink to={e.path} />
                                </Menu.Item>
                            );
                        })
                    }
                </Menu>
            </div>
            <div className="fold">
                <div className="container">
                    {collapsed ? <span className="rigth" onClick={setfold}><RightOutlined /></span> : <span className="left" onClick={setfold}><LeftOutlined /></span>}
                </div>
            </div>
        </Sider>
    );
};
export default SiderMenu;