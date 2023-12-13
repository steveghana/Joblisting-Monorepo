import { lazy } from "react";
import MainLayout from "../layout/MainLayout";
// project imports
// import MainLayout from 'layout/MainLayout';
import Loadable from "../components/Loadable";
import Home from "../views/Landing/page";
import BaseLayout from "../components/layouts/BaseLayout";
import { Navigate } from "react-router";
import { FormDataProvider } from "../utils/Contexts/clientFormContext";
import InterviewEdit from "../views/Devs/Interview/interviewEdit";
import DynamicRoles from "../views/dashboard/Roles/dynamicRoles";
import ShortUrlPage from "../views/dashboard/Roles/dynamicRoles";
// dashboard routing
const InterviewScheduler = Loadable(
  lazy(() => import("../views/HR/interviewSteps/InterviewScheduler"))
);
const JobSubmissionContainer = Loadable(
  lazy(() => import("../views/dashboard/Roles/ApplicationForm/JobSubmission"))
);
const Developers = Loadable(lazy(() => import("../views/Devs/Devs")));
const AddClient = Loadable(
  lazy(() => import("../views/dashboard/clients/Details/clientForm"))
);
const ClientDetails = Loadable(
  lazy(() => import("../views/dashboard/clients/Details"))
);
const StatusComingSoon = Loadable(
  lazy(() => import("../views/status/ComingSoon"))
);
const Status404 = Loadable(lazy(() => import("../views/status/Status404")));
const DashboardDefault = Loadable(
  lazy(() => import("../views/dashboard/Default"))
);
const UserProfile = Loadable(lazy(() => import("../views/users/profile")));
const UserSettings = Loadable(lazy(() => import("../views/users/settings")));
// utilities routing
const Clients = Loadable(lazy(() => import("../views/dashboard/clients")));
const Roles = Loadable(lazy(() => import("../views/dashboard/Roles")));
const Interviews = Loadable(
  lazy(() => import("../views/Devs/Interview/Interviews"))
);
const Hub = Loadable(lazy(() => import("../views/Devs/devHub")));

// sample page routing
const ShortListedDevs = Loadable(lazy(() => import("../views/HR")));

// ==============================|| MAIN ROUTING ||============================== //
export const ExternalRoutes = {
  path: "/",
  element: <BaseLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
  ],
};
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
      path: "/s/:shortComponent",
      element: <ShortUrlPage />,
    },
    {
      path: "/c/:clientId",
      element: <div>This is the new role page</div>,
    },
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
          element: <Developers />,
        },

        {
          path: "interviews",
          element: <Interviews />,
        },
        {
          path: "interviews/Edit/:id",
          element: <InterviewEdit />,
        },
        {
          path: "hub",
          // element: <Hub />,
          element: <StatusComingSoon />,
        },
      ],
    },
    {
      path: "devs/shortlisted",
      element: <ShortListedDevs />,
    },
    {
      path: "/hr/interviews/:id",
      element: <InterviewScheduler />,
      // element: <Scheduler />,
    },
    {
      path: "/hr/interviews/create",
      element: <InterviewScheduler />,
      // element: <Scheduler />,
    },
    {
      path: "job-submttion/:id",
      element: <JobSubmissionContainer />,
    },
  ],
};

export default MainRoutes;
