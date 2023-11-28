import { lazy } from "react";
import MainLayout from "../layout/MainLayout";
// project imports
// import MainLayout from 'layout/MainLayout';
import Loadable from "../components/Loadable";
import Home from "../views/Landing/page";
import BaseLayout from "../components/layouts/BaseLayout";
import { Navigate } from "react-router";
import JobSubmissionContainer from "../views/dashboard/Roles/ApplicationForm/JobSubmission";
import ClientDetails from "../views/dashboard/clients/Details/overview";
import AddClient from "../views/dashboard/clients/Details/clientForm";
import Status404 from "../views/status/Status404";
import { FormDataProvider } from "../utils/Contexts/clientFormContext";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("../views/dashboard/Default"))
);
const UserProfile = Loadable(lazy(() => import("../views/users/profile")));
const UserSettings = Loadable(lazy(() => import("../views/users/settings")));
// utilities routing
const AllDevs = Loadable(lazy(() => import("../views/Devs")));
const Clients = Loadable(lazy(() => import("../views/dashboard/clients")));
const Roles = Loadable(lazy(() => import("../views/dashboard/Roles")));
const Interviews = Loadable(lazy(() => import("../views/Devs/Interviews")));
const Hub = Loadable(lazy(() => import("../views/Devs/devHub")));

// sample page routing
const SamplePage = Loadable(lazy(() => import("../views/HR")));

// ==============================|| MAIN ROUTING ||============================== //

export const homeRoutes = {
  path: "/",
  element: <BaseLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/access-denied",
      element: <Status404 />,
    },
    {
      path: "*",
      element: <Status404 />,
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
          path: "",
          element: <Navigate to="default" replace />,
        },
        {
          path: "default",
          element: <DashboardDefault />,
        },
        {
          path: "customers/clients",
          element: <Clients />,
        },
        {
          path: "customers/clients/:id",
          element: <ClientDetails />,
        },
        {
          path: "customers/clients/add",
          element: (
            <FormDataProvider>
              <AddClient />,
            </FormDataProvider>
          ),
        },
        {
          path: "jobs/roles",
          element: <Roles />,
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
          path: "profile",
          children: [
            {
              path: "",
              element: <Navigate to="details/:id" replace />,
            },
            {
              path: "details/:id",
              element: <UserProfile />,
            },
            {
              path: "settings/:id",
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
          element: <AllDevs />,
        },

        {
          path: "interviews",
          element: <Interviews />,
        },
        {
          path: "hub",
          element: <Hub />,
        },
      ],
    },

    {
      path: "sample-page",
      element: <SamplePage />,
    },
    {
      path: "job-submttion/:id",
      element: <JobSubmissionContainer />,
    },
  ],
};

export default MainRoutes;
