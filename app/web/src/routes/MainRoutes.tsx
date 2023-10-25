import { lazy } from "react";
import MainLayout from "../layout/MainLayout";
// project imports
// import MainLayout from 'layout/MainLayout';
import Loadable from "../ui-component/Loadable";
import Home from "../views/Landing/page";
import BaseLayout from "../components/layouts/BaseLayout";
import { Navigate } from "react-router";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("../views/dashboard/Default"))
);
const UserProfile = Loadable(
  lazy(() => import("../app/pages/dashboard/applications/users/profile"))
);
const UserSettings = Loadable(
  lazy(() => import("../app/pages/dashboard/applications/users/settings"))
);
// utilities routing
const Transactions = Loadable(
  lazy(() => import("../app/pages/dashboard/applications/transactions"))
);
const Clients = Loadable(lazy(() => import("../views/dashboard/clients")));
const UtilsShadow = Loadable(lazy(() => import("../views/utilities/Shadow")));
const UtilsMaterialIcons = Loadable(
  lazy(() => import("../views/utilities/MaterialIcons"))
);

// sample page routing
const SamplePage = Loadable(lazy(() => import("../views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

export const homeRoutes = {
  path: "/",
  element: <BaseLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
  ],
};
const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/dashboard",
      element: <DashboardDefault />,
    },

    {
      path: "dashboard",
      children: [
        {
          path: "default",
          element: <DashboardDefault />,
        },
        {
          path: "customers/clients",
          element: <Clients />,
        },
      ],
    },

    {
      path: "management",
      // element: <SidebarLayout />,
      children: [
        {
          path: "",
          element: <Navigate to="transactions" replace />,
        },
        {
          path: "transactions",
          element: <Transactions />,
        },
        {
          path: "profile",
          children: [
            {
              path: "",
              element: <Navigate to="details" replace />,
            },
            {
              path: "details",
              element: <UserProfile />,
            },
            {
              path: "settings",
              element: <UserSettings />,
            },
          ],
        },
      ],
    },

    {
      path: "devs",
      children: [
        {
          path: "all",
          element: <Transactions />,
        },
      ],
    },

    {
      path: "icons",
      children: [
        {
          path: "material-icons",
          element: <UtilsMaterialIcons />,
        },
      ],
    },
    {
      path: "sample-page",
      element: <SamplePage />,
    },
  ],
};

export default MainRoutes;
