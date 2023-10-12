// material-ui
import { Typography } from "@mui/material";
import React from "react";
// project imports
import NavGroup from "./NavGroup";
import menuItem from "../../../../menu-items";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const userRole = localStorage.getItem("role");
  const filteredSidebarData = menuItem.items.filter((item) =>
    item.roles.includes(userRole)
  );
  const navItems = filteredSidebarData.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
