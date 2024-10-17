import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminHomepage from "./pages/AdminHomepage";
import AdminLogin from "./components/admin/AdminLogin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="" element={<Home />} />
        </Route>

        <Route path="/admin" element={<AdminHomepage />}>
          <Route path="" element={<Outlet />} />
        </Route>

        <Route path='/admin/login' element={<AdminLogin />} />

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
