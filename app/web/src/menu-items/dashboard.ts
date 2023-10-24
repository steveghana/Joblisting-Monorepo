// assets
import { IconDashboard, IconUser } from "@tabler/icons";

// constant
const icons = { IconDashboard, IconUser };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  roles: ["Ceo"],
  type: "group",
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/dashboard/default",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "client",
      title: "Clients",
      type: "item",
      url: "/dashboard/clients",
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
