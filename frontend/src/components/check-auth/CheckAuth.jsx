import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

// this components check basically user is authinticated or admin to redirect given conditions or page (protected route)

const CheckAuth = ({ isAuthenticated, user, children }) => {
  // giving you current path or location of page

  const loaction = useLocation();

  if(loaction.pathname === '/'){
     if(!isAuthenticated){
       return <Navigate to={'/auth/login'}  />
     }else{
      if (user?.role === "admin") {
        return <Navigate to={"/admin/dashboard"} />;
      } else {
        return  <Navigate to={"/shop/home"} />;
      }
     }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") || location.pathname.includes("/change-pass") 
    )
  ) {
    return <Navigate to={"/auth/login"} />;
  }

  if (
    (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register')))
  ) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return  <Navigate to={"/shop/home"} />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to={"/shop/home"} />;
  }
  if (
    isAuthenticated &&
    user.role === "admin" &&
    loaction.pathname.includes("/shop")
  ) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return <>{children}</>;
};

export default CheckAuth;


