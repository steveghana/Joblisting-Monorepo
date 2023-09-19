import BrightnessLowTwoToneIcon from "@mui/icons-material/BrightnessLowTwoTone";
import MmsTwoToneIcon from "@mui/icons-material/MmsTwoTone";
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import BallotTwoToneIcon from "@mui/icons-material/BallotTwoTone";
import BeachAccessTwoToneIcon from "@mui/icons-material/BeachAccessTwoTone";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import ChromeReaderModeTwoToneIcon from "@mui/icons-material/ChromeReaderModeTwoTone";
import CameraFrontTwoToneIcon from "@mui/icons-material/CameraFrontTwoTone";
import DisplaySettingsTwoToneIcon from "@mui/icons-material/DisplaySettingsTwoTone";
export const sidebarData = [
  {
    rootTitle: "Dashboard",
    roles: ["admin", "devs"],
    subpages: [
      {
        title: "Home",
        link: "/dashboards/home",
        icon: <BrightnessLowTwoToneIcon />,
      },
      {
        title: "Chat",
        link: "/dashboards/messenger",
        icon: <MmsTwoToneIcon />,
      },
    ],
  },
  {
    rootTitle: "Management",
    roles: ["admin"],
    subpages: [
      {
        title: "Transation list",
        link: "/management/transaction",
        icon: <TableChartTwoToneIcon />,
      },
    ],
  },
  {
    rootTitle: "Accounts",
    roles: ["admin", "Developers", "Hr", "Marketing"],
    subpages: [
      {
        title: "User profile",
        link: "/management/profile/details",
        icon: <AccountCircleTwoToneIcon />,
      },
      {
        title: "Account settings",
        link: "/management/profile/settings",
        icon: <DisplaySettingsTwoToneIcon />,
      },
    ],
  },
  {
    rootTitle: "Devs",
    roles: ["admin", "Developers"],
    subpages: [
      {
        title: "item1",
        link: "/components/item",
        icon: <BallotTwoToneIcon />,
      },
      {
        title: "Account settings",
        link: "/components/item1",
        icon: <BeachAccessTwoToneIcon />,
      },
    ],
  },
  {
    rootTitle: "Hr",
    roles: ["admin", "Hr"],
    subpages: [
      {
        title: "item1",
        link: "/components/item",
        icon: <BallotTwoToneIcon />,
      },
      {
        title: "Account settings",
        link: "/components/item1",
        icon: <BeachAccessTwoToneIcon />,
      },
    ],
  },
  {
    rootTitle: "Error Pages",
    roles: ["admin", "Developers", "Hr", "Marketing"],
    subpages: [
      {
        title: "Error 404",
        link: "/status/404",
        icon: <CheckBoxTwoToneIcon />,
      },
      {
        title: "Error 500",
        link: "/status/500",
        icon: <CameraFrontTwoToneIcon />,
      },
      {
        title: "Coming soon",
        link: "/status/coming-soon",
        icon: <ChromeReaderModeTwoToneIcon />,
      },
      {
        title: "Maintenance",
        link: "/status/maintenance",
        icon: <ChromeReaderModeTwoToneIcon />,
      },
    ],
  },
];
