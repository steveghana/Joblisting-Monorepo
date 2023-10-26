// assets
import { IconBrandChrome, IconHelp } from "@tabler/icons";

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: "Hr",
  title: "Recruitment",

  type: "group",
  roles: ["Ceo"],

  children: [
    {
      id: "sample-page",
      title: "Item Page",
      type: "item",
      url: "/sample-page",
      icon: icons.IconBrandChrome,
      breadcrumbs: false,
    },
    {
      id: "item",
      title: "item",
      type: "item",
      icon: icons.IconHelp,
      external: true,
      target: true,
    },
  ],
};

export default other;
