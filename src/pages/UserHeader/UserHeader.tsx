import React, { useState } from "react";
import { Layout } from "antd";
const { Header } = Layout;

export default function UserHeader() {
    return (
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
            <div className="content">用户管理</div>
            <div className="action"></div>
        </Header >
    );
}