import React from "react";
import MainCard from "../../../components/MainCard";
import {
  Avatar,
  Button,
  ButtonBase,
  Divider,
  Drawer,
  Grid,
  Typography,
} from "@mui/material";
import SubCard from "../../../components/SubCard";
import { Box } from "@mui/system";
import {
  AllInclusive,
  BlockOutlined,
  CheckCircle,
  MessageRounded,
  MoreHoriz,
  People,
} from "@mui/icons-material";
import { themePalette } from "../../../themes/schemes/palette";

const Roles = () => {
  return (
    <MainCard title={"Clients"}>
      <Grid container>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2 }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <RoleCard key={index} />
          ))}
        </Grid>
      </Grid>
    </MainCard>
  );
};
type Anchor = "top" | "left" | "bottom" | "right";
const RoleCard = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      Hello
    </Box>
  );
  return (
    <Grid
      sx={{ cursor: "pointer" }}
      onClick={toggleDrawer("bottom", true)}
      item
      xs={2}
      sm={4}
      md={4}
    >
      <Drawer
        anchor={"bottom"}
        open={state["botton"]}
        onClose={toggleDrawer("bottom", false)}
      >
        {list("bottom")}
      </Drawer>
      <SubCard sx={{ cursor: "pointer" }}>
        <Grid container direction="column" spacing={1}>
          <Grid className="avatar" display={"flex"} gap={"1rem"} item>
            <Avatar alt="user" variant="rounded" />
            <Box mr={"auto"}>
              <Typography fontWeight={700} variant="h4" mr={"auto"}>
                Smart Contract
              </Typography>
              <Typography variant="caption" color={"black"}>
                #1 Rated & Highest convertion all in one real estate platform
              </Typography>
              <Box
                sx={{ color: themePalette.primary.light }}
                display={"flex"}
                gap={".3rem"}
                alignItems={"center"}
              >
                <People sx={{ color: themePalette.primary.dark }} />
                <Typography variant="caption" fontWeight={700}>
                  11 - 50
                </Typography>
                <Typography variant="caption" fontWeight={700}>
                  Employees
                </Typography>
              </Box>
            </Box>

            <ButtonBase>
              <MoreHoriz />
            </ButtonBase>
          </Grid>
          {/* <Divider sx={{ margin: "1rem 0" }} /> */}
          <Grid my={1} className="mail links" item>
            <Button
              sx={{
                background: "rgba(27, 227, 44, 0.1)",
                border: "1px solid rgba(27, 227, 44, 0.5)",
                borderRadius: "50px",
              }}
              disabled={true}
              startIcon={<CheckCircle color="success" />}
            >
              <Typography variant="caption">Actively Hiring</Typography>
            </Button>
            {/* <Divider sx={{ margin: "1rem 0" }} /> */}
            <Box my={2} alignItems={"center"} gap={".8rem"} display={"flex"}>
              <Typography fontWeight={700} variant="body2">
                Fullstack Developer
              </Typography>
              <Typography fontWeight={400} variant="subtitle1" mr={"auto"}>
                Remote
              </Typography>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <Typography>Posted 4 weeks ago</Typography>
                <AllInclusive
                  fontSize="small"
                  sx={{ color: themePalette.primary.main }}
                />
              </Box>
            </Box>
            <Divider sx={{ margin: "1rem 0" }} />
            <Box display={"flex"} justifyContent={"flex-end"} gap={"1rem"}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<MessageRounded />}
              >
                Message
              </Button>
              <Button
                size="small"
                color="error"
                variant="outlined"
                startIcon={<BlockOutlined />}
              >
                Remove
              </Button>
            </Box>
          </Grid>
        </Grid>
      </SubCard>
    </Grid>
  );
};

export default Roles;
