import { lazy } from "react";
import React from "react";
import MinimalLayout from "../layout/MinimalLayout";
// project imports
import Loadable from "../ui-component/Loadable";
// import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(
  lazy(() => import("../views/pages/authentication/authentication3/Login3"))
);
const AuthRegister3 = Loadable(
  lazy(() => import("../views/pages/authentication/authentication3/Register3"))
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/management/profile/details",
      element: <AuthLogin3 />,
    },
    {
      path: "/management/profile/settings",
      element: <AuthRegister3 />,
    },
  ],
};

export default AuthenticationRoutes;
