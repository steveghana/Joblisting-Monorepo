// assets

import { Dashboard } from "@mui/icons-material";

// import { IconDashboard } from '@tabler/icons';

// constant
const icons = { Dashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/dashboard/default",
      icon: icons.Dashboard,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
