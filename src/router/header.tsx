import React from "react";
import { Routes, Route } from "react-router-dom";
import ViewHeader from "../pages/ViewHeader/ViewHeader";
import UserHeader from "../pages/UserHeader/UserHeader";
export default function header() {
    return (
        <Routes>
            <Route path="/" element={<ViewHeader />} />
            <Route path="/user" element={<UserHeader />} />
        </Routes>
    );
}
