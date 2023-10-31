import React from "react";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";

type ICustomDrawer = {
  children: React.ReactElement;
  component: React.ReactElement;
  openDrawer: {
    bottom: boolean;
  };
  setOpenDrawer: React.Dispatch<
    React.SetStateAction<{
      bottom: boolean;
    }>
  >;
};
const CustomDrawer = (props: ICustomDrawer) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const list = () => (
    <Box
      sx={{ width: "auto" }}
      px={2.5}
      py={2}
      role="presentation"
      onClick={() =>
        props.setOpenDrawer({ ...props.openDrawer, ["bottom"]: false })
      }
      onKeyDown={() =>
        props.setOpenDrawer({ ...props.openDrawer, ["bottom"]: false })
      }
    >
      {props.component}
    </Box>
  );

  return (
    <>
      <Drawer
        anchor={"bottom"}
        open={props.openDrawer["bottom"]}
        onClose={() =>
          props.setOpenDrawer({ ...props.openDrawer, ["bottom"]: false })
        }
      >
        <Box
          sx={{
            borderRadius: "35px 35px 0 0",
            background: "white",
          }}
          height={"89vh"}
        >
          <PerfectScrollbar
            component="div"
            style={{
              height: !matchUpMd ? "calc(89vh - 16px)" : "calc(89vh - 18px)",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            {list()}
          </PerfectScrollbar>
        </Box>
      </Drawer>
      {props.children}
    </>
  );
};
export default CustomDrawer;
