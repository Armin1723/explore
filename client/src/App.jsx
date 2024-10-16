import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminHomepage from "./pages/AdminHomepage";
import AdminLogin from "./components/admin/AdminLogin";
import AdminUsers from "./components/admin/AdminUsers";
import AdminCompanies from "./components/admin/AdminCompanies";
import AdminReviews from "./components/admin/AdminReviews";
import AdminRequests from "./components/admin/AdminRequests";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="" element={<Home />} />
        </Route>

        <Route path="/admin" element={<AdminHomepage />}>
          <Route path="" element={<AdminUsers/>} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='companies' element={<AdminCompanies />} />
          <Route path='reviews' element={<AdminReviews />} />
          <Route path='companies/:category' element={<AdminCompanies />} />
          <Route path="requests" element={<AdminRequests />} />
        </Route>

        <Route path='/admin/login' element={<AdminLogin />} />

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
