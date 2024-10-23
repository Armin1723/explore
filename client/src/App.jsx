import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminHomepage from "./pages/AdminHomepage";
import AdminLogin from "./components/admin/AdminLogin";
import AdminUsers from "./components/admin/AdminUsers";
import AdminCompanies from "./components/admin/AdminCompanies";
import AdminReviews from "./components/admin/AdminReviews";
import AdminRequests from "./components/admin/AdminRequests";
import CompanyHomepage from "./pages/CompanyHomepage";
import CompanyDetail from "./components/company/CompanyDetail";
import NotFound from "./pages/NotFound";
import Register from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import AuthPage from "./pages/AuthPage";
import UserPage from "./pages/UserPage";
import UserDetail from "./components/user/UserDetail";
import ResetPassword from "./components/auth/ResetPassword";
import CompanyListing from "./pages/CompanyListing";

const App = () => {

  const [refetch, setRefetch] = React.useState(false);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="" element={<Home />} />
        </Route>

        <Route path='/companies' element={<CompanyHomepage/>} >
          <Route path=':name' element={<CompanyDetail />} />
          <Route path='categories' element={<CompanyDetail />} /> 
          <Route path='search' element={<CompanyDetail />} />
        </Route>

        <Route path='/companies/add' element={<CompanyListing />} />

        <Route path='/auth' element={<AuthPage/>} >
          <Route path="" element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
        </Route>

        <Route path='/users' element={<UserPage />}>
          <Route path=':id' element={<UserDetail />} />
        </Route>


        <Route path="/admin" element={<AdminHomepage refetch={refetch} setRefetch={setRefetch}/>}>
          <Route path="" element={<AdminUsers/>} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='companies' element={<AdminCompanies />} />
          <Route path='reviews' element={<AdminReviews />} />
          <Route path='companies/:category' element={<AdminCompanies />} />
          <Route path="requests" element={<AdminRequests refetch={refetch} setRefetch={setRefetch}  />} />
        </Route>

        <Route path='/admin/login' element={<AdminLogin />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
