import React from "react";
import { Layout, Content } from "antd";
const { Content } = Layout;
import SiderMenu from "../pages/Sider/SiderMenu";
import Router from "../router/index";
import RouterHeader from "../router/header";
import "./layout.css";
export default function LayoutM() {
    return (
        <Layout>
            <SiderMenu />
            <Layout className="site-layout">
                <RouterHeader />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: "auto"
                    }}
                >
                    <Router />
                </Content>
            </Layout >
        </Layout >
    );
}
