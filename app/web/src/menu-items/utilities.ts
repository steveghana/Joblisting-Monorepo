// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
} from "@tabler/icons";

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: "Devs",
  title: "Devs",
  type: "group",
  roles: ["Ceo", "Developer"],

  children: [
    {
      id: "util-typography",
      title: "Dev Hub",
      type: "item",
      url: "/utils/util-typography",
      icon: icons.IconTypography,
      breadcrumbs: false,
    },
    {
      id: "util-color",
      title: "Dev interviews",
      type: "item",
      url: "/utils/util-color",
      icon: icons.IconPalette,
      breadcrumbs: false,
    },
    {
      id: "Devs",
      title: "All devs",
      type: "item",
      url: "/devs/all",
      icon: icons.IconShadow,
      breadcrumbs: false,
    },
  ],
};

export default utilities;
