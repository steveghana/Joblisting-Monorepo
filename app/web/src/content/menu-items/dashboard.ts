// assets
import { IconDashboard, IconUser } from "@tabler/icons";

// constant
const icons = { IconDashboard, IconUser };

// ==============================|| DASHBOARD & CLIENTS MENU ITEMS ||============================== //

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
      url: "/dashboard/customers/clients",
      icon: icons.IconUser,
      breadcrumbs: false,
    },
    {
      id: "roles",
      title: "Roles",
      type: "item",
      url: "/dashboard/jobs/roles",
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
