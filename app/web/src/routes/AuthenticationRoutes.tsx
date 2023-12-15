import { lazy } from "react";
import React from "react";
import MinimalLayout from "../layout/MinimalLayout";
// project imports
import Loadable from "../components/Loadable";
import AuthCallBack from "../components/auth/login";
import RoleAuth from "../components/auth/roleAuthForm";
// import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(
  lazy(() => import("../components/auth/authentication3/Login3"))
);
const AuthRegister3 = Loadable(
  lazy(() => import("../components/auth/authentication3/Register3"))
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/role/select",
      element: <RoleAuth />,
    },
    {
      path: "/auth/login",
      element: <AuthLogin3 />,
    },
    {
      path: "/auth/login/callback",
      element: <AuthCallBack />,
    },
    {
      path: "/auth/register",
      element: <AuthRegister3 />,
    },
  ],
};

export default AuthenticationRoutes;
