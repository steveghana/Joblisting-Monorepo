import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

import SidebarLayout from "./components/layouts/SidebarLayout";
import BaseLayout from "./components/layouts/BaseLayout";

import SuspenseLoader from "./components/SuspenseLoader";
import Home from "./app/pages/Landing/page";
import Auth from "./app/pages/auth/page";

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import("./app/pages/overview")));

// Dashboards

const Dashboard = Loader(
  lazy(() => import("./app/pages/dashboard/boards/main"))
);

// Applications

const Messenger = Loader(
  lazy(() => import("./app/pages/dashboard/applications/messenger"))
);
const Transactions = Loader(
  lazy(() => import("./app/pages/dashboard/applications/transactions"))
);
const UserProfile = Loader(
  lazy(() => import("./app/pages/dashboard/applications/users/profile"))
);
const UserSettings = Loader(
  lazy(() => import("./app/pages/dashboard/applications/users/settings"))
);

// Components

const Subpage = Loader(lazy(() => import("./app/pages/subPages/item")));
const SubPage1 = Loader(lazy(() => import("./app/pages/subPages/item1")));

// Status

const Status404 = Loader(lazy(() => import("./app/pages/status/Status404")));
const Status500 = Loader(lazy(() => import("./app/pages/status/Status500")));
const StatusComingSoon = Loader(
  lazy(() => import("./app/pages/status/ComingSoon"))
);
const StatusMaintenance = Loader(
  lazy(() => import("./app/pages/status/Maintenance"))
);

const routes: RouteObject[] = [
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "overview",
      //   element: <Navigate to="/" replace />,
      // },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/overview",
        element: <Overview />,
      },
      {
        path: "status",
        children: [
          {
            path: "",
            element: <Navigate to="404" replace />,
          },
          {
            path: "404",
            element: <Status404 />,
          },
          {
            path: "500",
            element: <Status500 />,
          },
          {
            path: "maintenance",
            element: <StatusMaintenance />,
          },
          {
            path: "coming-soon",
            element: <StatusComingSoon />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "dashboards",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        element: <Dashboard />,
      },
      {
        path: "messenger",
        element: <Messenger />,
      },
    ],
  },
  {
    path: "management",
    element: <SidebarLayout />,
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
    path: "/components",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="buttons" replace />,
      },
      {
        path: "item",
        element: <Subpage />,
      },
      {
        path: "item1",
        element: <SubPage1 />,
      },
    ],
  },
];

export default routes;
