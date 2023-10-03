// assets
// import { IconBrandChrome, IconHelp } from '@tabler/icons';

import { HelpOutline, ChromeReaderMode } from "@mui/icons-material";

// constant
const icons = { ChromeReaderMode, HelpOutline };
HelpOutline;
// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: "sample-docs-roadmap",
  type: "group",
  children: [
    {
      id: "sample-page",
      title: "Sample Page",
      type: "item",
      url: "/sample-page",
      icon: icons.ChromeReaderMode,
      breadcrumbs: false,
    },
    {
      id: "documentation",
      title: "Documentation",
      type: "item",
      url: "https://codedthemes.gitbook.io/berry/",
      icon: icons.HelpOutline,
      external: true,
      target: true,
    },
  ],
};

export default other;
