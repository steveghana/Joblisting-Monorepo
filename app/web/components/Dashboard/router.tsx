import { Suspense, lazy } from "react";
// import useNavi from 'next/navigation';
// import { RouteObject } from 'react-router';
import LInk from "next/link";

import SidebarLayout from "./layouts/SidebarLayout";
import BaseLayout from "./layouts/BaseLayout";

import SuspenseLoader from "./components/SuspenseLoader";

const Loader = (Component: any) => (props: any) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

const Overview = Loader(
  lazy(() => import("../../app/(afterAuthorized)/home/page"))
);

// Dashboards

const Crypto = Loader(lazy(() => import("../../app/dashboards/Crypto/page")));

// Applications

const Messenger = Loader(
  lazy(() => import("../../app/applications/Messenger/page"))
);
const Transactions = Loader(
  lazy(() => import("../../app/applications/Transactions/page"))
);
const UserProfile = Loader(
  lazy(() => import("../../app/applications/Users/profile/page"))
);
const UserSettings = Loader(
  lazy(() => import("../../app/applications/Users/settings/page"))
);

// Components

const Buttons = Loader(lazy(() => import("../../app/components/Buttons/page")));
const Modals = Loader(lazy(() => import("../../app/components/Modals/page")));
const Accordions = Loader(
  lazy(() => import("../../app/components/Accordions/page"))
);
const Tabs = Loader(lazy(() => import("../../app/components/Tabs/page")));
const Badges = Loader(lazy(() => import("../../app/components/Badges/page")));
const Tooltips = Loader(
  lazy(() => import("../../app/components/Tooltips/page"))
);
const Avatars = Loader(lazy(() => import("../../app/components/Avatars/page")));
const Cards = Loader(lazy(() => import("../../app/components/Cards/page")));
const Forms = Loader(lazy(() => import("../../app/components/Forms/page")));

// Status

const Status404 = Loader(lazy(() => import("../../app/status/Status404/page")));
const Status500 = Loader(lazy(() => import("../../app/status/Status500/page")));
const StatusComingSoon = Loader(
  lazy(() => import("../../app/status/ComingSoon/page"))
);
const StatusMaintenance = Loader(
  lazy(() => import("../../app/status/Maintenance/page"))
);

const routes = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "overview",
        element: <LInk href="/" replace />,
      },
      {
        path: "status",
        children: [
          {
            path: "",
            element: <LInk href="404" replace />,
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
        element: <LInk href="crypto" replace />,
      },
      {
        path: "crypto",
        element: <Crypto />,
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
        element: <LInk href="transactions" replace />,
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
            element: <LInk href="details" replace />,
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
        element: <LInk href="buttons" replace />,
      },
      {
        path: "buttons",
        element: <Buttons />,
      },
      {
        path: "modals",
        element: <Modals />,
      },
      {
        path: "accordions",
        element: <Accordions />,
      },
      {
        path: "tabs",
        element: <Tabs />,
      },
      {
        path: "badges",
        element: <Badges />,
      },
      {
        path: "tooltips",
        element: <Tooltips />,
      },
      {
        path: "avatars",
        element: <Avatars />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "forms",
        element: <Forms />,
      },
    ],
  },
];

export default routes;
