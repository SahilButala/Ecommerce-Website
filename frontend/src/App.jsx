import React, { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";




// auth components
const AuthLayoutPage = lazy(() => import("./pages/auth/index"));
const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));
// admin components
const AdminLayOutPage = lazy(() => import("./pages/admin/layout"));
const AdminProducts = lazy(() => import("./pages/admin/Products"));
const AdminDashBoard = lazy(() => import("./pages/admin/DashBoard"));
const AdminOrders = lazy(() => import("./pages/admin/Orders"));
const NotFound = lazy(() => import("./pages/NotFound/index"));
// user componnets
const UserLayOutPage = lazy(() => import("./pages/user_view/layout"));
const AllProducts = lazy(() => import("./pages/user_view/AllProductsPage"));
const CheckOut = lazy(() => import("./pages/user_view/CheckOut"));
const Account = lazy(() => import("./pages/user_view/Account"));
const Home = lazy(() => import("./pages/user_view/Home"));
const  CheckAuth = lazy(() => import("./components/check-auth/CheckAuth"));
const  ProductDetails = lazy(() => import("./pages/user_view/ProductDetails"));
const PaypalReturnPage = lazy(()=>import('./pages/user_view/paypal_return'))
const PaymentSucces = lazy(()=>import("./pages/user_view/Payment_Succes"))
const SearchPage = lazy(()=>import("./pages/user_view/SearchPage"))





const App = () => {
  const {isAuthenticated,user} = useSelector(store=>store.auth)
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* authintication sections routes */}
        <Route path="/" 
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            </CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayoutPage />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* admin sections routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayOutPage />
            </CheckAuth>
          }
        >
          {/* admin pages */}
          <Route path="products" element={<AdminProducts />} />
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        {/* User sections ---main view of web ---  */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <UserLayOutPage />
            </CheckAuth>
          }
        >
          <Route path="checkout" element={<CheckOut />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="products/details/:id" element={<ProductDetails />} />
          <Route path="account" element={<Account />} />
          <Route path="home" element={<Home />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="payment-success" element={<PaymentSucces />} />
        </Route>
          <Route path="paypal-return" element={<PaypalReturnPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
