// assets

import {
  Palette,
  WbShadeTwoTone,
  TextDecrease,
  ChatRounded,
} from "@mui/icons-material";

// import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
Palette;

// constant
const icons = {
  ChatRounded,
  WbShadeTwoTone,
  Palette,
  TextDecrease,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: "utilities",
  title: "Utilities",
  type: "group",
  children: [
    {
      id: "util-typography",
      title: "Typography",
      type: "item",
      url: "/utils/util-typography",
      icon: icons.ChatRounded,
      breadcrumbs: false,
    },
    {
      id: "util-color",
      title: "Color",
      type: "item",
      url: "/utils/util-color",
      icon: icons.Palette,
      breadcrumbs: false,
    },
    {
      id: "util-shadow",
      title: "Shadow",
      type: "item",
      url: "/utils/util-shadow",
      icon: icons.TextDecrease,
      breadcrumbs: false,
    },
    {
      id: "icons",
      title: "Icons",
      type: "collapse",
      icon: icons.WbShadeTwoTone,
      children: [
        {
          id: "tabler-icons",
          title: "Tabler Icons",
          type: "item",
          url: "/icons/tabler-icons",
          breadcrumbs: false,
        },
        {
          id: "material-icons",
          title: "Material Icons",
          type: "item",
          external: true,
          target: "_blank",
          url: "https://mui.com/material-ui/material-icons/",
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default utilities;
