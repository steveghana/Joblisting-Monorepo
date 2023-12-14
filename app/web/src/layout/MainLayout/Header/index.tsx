import PropTypes from "prop-types";
import React from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase } from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import SearchSection from "./SearchSection";
import ProfileSection from "./ProfileSection";
import NotificationSection from "./NotificationSection";

// assets
import { IconMenu2 } from "@tabler/icons";
import { componentThemeoption } from "../../../themes/schemes/PureLightTheme";
import { themePalette } from "../../../themes/schemes/palette";
// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  //get the access lockSider and depending on whether there is a token, then you can show

  const lockSider = true;

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box component="span" sx={{ display: { md: "block" }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        {!lockSider && (
          <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
            <Avatar
              variant="rounded"
              sx={{
                ...componentThemeoption.commonAvatar,
                ...componentThemeoption.mediumAvatar,
                transition: "all .2s ease-in-out",
                background: themePalette.secondary.light,
                color: themePalette.primary.main,
                "&:hover": {
                  background: themePalette.primary.main,
                  color: themePalette.secondary.light,
                },
              }}
              onClick={handleLeftDrawerToggle}
              color="inherit"
            >
              <IconMenu2 stroke={1.5} size="1.3rem" />
            </Avatar>
          </ButtonBase>
        )}
      </Box>

      {/* header search */}
      {/* <SearchSection /> */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      {!lockSider && (
        <>
          <NotificationSection />
          <ProfileSection />
        </>
      )}
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
