import React from "react";
import { Route, Routes } from "react-router-dom";
import View from "../pages/View/View";
import User from "../pages/User/User";
export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<View />} />
            <Route path="/user" element={<User />} />
        </Routes>
    );
}
