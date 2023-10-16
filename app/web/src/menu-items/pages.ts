// assets
import { IconKey } from "@tabler/icons";

// constant
const icons = {
  IconKey,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  title: "User auth",
  caption: "user Caption",
  type: "group",
  roles: ["Ceo"],

  children: [
    {
      id: "authentication",
      title: "User",
      type: "collapse",
      icon: icons.IconKey,

      children: [
        {
          id: "login3",
          title: "Profile",
          type: "item",
          url: "/auth/login",
          target: true,
        },
        {
          id: "register3",
          title: "Accoount",
          type: "item",
          url: "/auth/register",
          target: true,
        },
      ],
    },
  ],
};

export default pages;
