import React from "react";
import { Layout } from "antd";
const { Header } = Layout;
import "./index.css";
export default function ViewHeader() {
    return (
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
            <span className="content">可视化</span>
            <div className="userItem"></div>
        </Header >
    );
}



