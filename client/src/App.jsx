import React, { Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const AdminCategories = React.lazy(() => import("./components/admin/AdminCategories"));
const AddCategoryForm = React.lazy(() => import("./components/admin/AddCategoryForm"));
const AdminHomepage = React.lazy(() => import("./pages/AdminHomepage"));
const AdminLogin = React.lazy(() => import("./components/admin/AdminLogin"));
const AdminUsers = React.lazy(() => import("./components/admin/AdminUsers"));
const AdminCompanies = React.lazy(() =>
  import("./components/admin/AdminCompanies")
);
const AdminReviews = React.lazy(() =>
  import("./components/admin/AdminReviews")
);
const AdminRequests = React.lazy(() =>
  import("./components/admin/AdminRequests")
);
const CompanyHomepage = React.lazy(() => import("./pages/CompanyHomepage"));
const CompanyDetail = React.lazy(() =>
  import("./components/company/CompanyDetail")
);
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Register = React.lazy(() => import("./components/auth/Register"));
const VerifyOtp = React.lazy(() => import("./components/auth/VerifyOtp"));
const Login = React.lazy(() => import("./components/auth/Login"));
const ForgotPassword = React.lazy(() =>
  import("./components/auth/ForgotPassword")
);
const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const UserPage = React.lazy(() => import("./pages/UserPage"));
const UserDetail = React.lazy(() => import("./components/user/UserDetail"));
const ResetPassword = React.lazy(() =>
  import("./components/auth/ResetPassword")
);
const CompanyListing = React.lazy(() => import("./pages/CompanyListing"));
const Categories = React.lazy(() => import("./components/company/Categories"));
const Search = React.lazy(() => import("./components/company/Search"));
const AdvertiseForm = React.lazy(() =>import("./components/company/AdvertiseForm"));
const EnquiryForm = React.lazy(() =>
  import("./components/company/EnquiryForm")
);
const EnquiryPage = React.lazy(() => import("./components/company/EnquiryPage"));

const AboutUs = React.lazy(() => import("./pages/AboutUs"));

const App = () => {
  const [refetch, setRefetch] = React.useState(false);

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <div className="loader"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="" element={<Home />} />
          </Route>

          <Route path="/companies" element={<CompanyHomepage />}>
            <Route path="" element={<Categories/>} />
            <Route path=":name" element={<CompanyDetail />} />
            <Route path="categories" element={<Categories />} />
            <Route path="search" element={<Search />} />
            <Route path="add" element={<CompanyListing />} />
            <Route path="advertise" element={<AdvertiseForm />} />
            <Route path=":name/enquiries/add" element={<EnquiryForm />} />
            <Route path=":name/enquiries" element={<EnquiryPage />} />
          </Route>

          <Route path="/auth" element={<AuthPage />}>
            <Route path="" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify" element={<VerifyOtp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route path="/users" element={<UserPage />}>
            <Route path=":id" element={<UserDetail />} />
          </Route>

          <Route
            path="/admin"
            element={
              <AdminHomepage refetch={refetch} setRefetch={setRefetch} />
            }
          >
            <Route path="" element={<AdminUsers />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="companies" element={<AdminCompanies />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="companies/:category" element={<AdminCompanies />} />
            <Route
              path="requests"
              element={
                <AdminRequests refetch={refetch} setRefetch={setRefetch} />
              }
            />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="categories/add" element={<AddCategoryForm />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path='/about' element={<AboutUs />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
