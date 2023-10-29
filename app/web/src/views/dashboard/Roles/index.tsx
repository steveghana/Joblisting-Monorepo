import React from "react";
import MainCard from "../../../components/MainCard";
import {
  Avatar,
  Button,
  ButtonBase,
  ClickAwayListener,
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
import CustomDrawer from "../../../components/Drawer";

const Roles = () => {
  return (
    <MainCard title={"Roles"}>
      <Grid container>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2 }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <RoleCard key={index} />
          ))}
        </Grid>
        <Typography variant="h4" fontWeight={700} textAlign={"center"} m={2}>
          Featured Jobs
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, md: 4, lg: 8 }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <RoleCard feature={true} key={index} />
          ))}
        </Grid>
      </Grid>
    </MainCard>
  );
};
interface IRoleCard {
  feature?: boolean;
}
const RoleCard = (props: IRoleCard) => {
  const [openDrawer, setOpenDrawer] = React.useState({
    bottom: false,
  });

  return (
    <CustomDrawer
      component={<div>Hello from here</div>}
      setOpenDrawer={setOpenDrawer}
      openDrawer={openDrawer}
    >
      <Grid
        sx={{ cursor: "pointer" }}
        onClick={() => setOpenDrawer({ ...openDrawer, ["bottom"]: true })}
        item
        xs={2}
        sm={4}
        md={4}
      >
        <SubCard sx={{ cursor: "pointer" }}>
          <Grid container direction="column" spacing={1}>
            <Grid className="avatar" display={"flex"} gap={"1rem"} item>
              <Avatar alt="user" variant="rounded" />
              <Box mr={"auto"}>
                <Typography
                  fontWeight={700}
                  variant={props.feature ? "body1" : "h5"}
                  mr={"auto"}
                >
                  Smart Contract
                </Typography>
                {!props.feature && (
                  <>
                    <Typography variant="caption" color={"black"}>
                      #1 Rated & Highest convertion all in one real estate
                      platform
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
                  </>
                )}
              </Box>
              {!props.feature && (
                <ButtonBase>
                  <MoreHoriz />
                </ButtonBase>
              )}
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
              <Box
                my={2}
                alignItems={"center"}
                gap={".8rem"}
                display={"flex"}
                flexWrap={"wrap"}
              >
                <Typography fontWeight={700} variant="body2">
                  Fullstack Developer
                </Typography>
                <Typography fontWeight={400} variant="subtitle1" mr={"auto"}>
                  Isreal Remote
                </Typography>
                <Box
                  ml={props.feature ? "auto" : "0"}
                  display={"flex"}
                  justifyContent={"center"}
                  flexWrap={"wrap"}
                  flexDirection={props.feature ? "column" : "row"}
                  gap={1}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"flex-end"}
                    justifyContent={"flex-end"}
                    // gap={1}
                  >
                    {/* <AllInclusive
                      sx={{
                        color: themePalette.primary.main,
                        fontSize: ".8rem",
                      }}
                    /> */}
                    <Typography
                      ml={props.feature ? "auto" : "0"}
                      variant="caption"
                      fontWeight={700}
                      color={"green"}
                    >
                      Recruiter recently active
                    </Typography>
                    <Typography>Posted 4 weeks ago</Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    // flexWrap={"wrap"}
                    justifyContent={"center"}
                    gap={"1rem"}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        color: "black",
                        borderColor: "black",
                        maxHeight: "30px",
                      }}
                      startIcon={<MessageRounded />}
                    >
                      <Typography variant="caption">Message</Typography>
                    </Button>
                    <Button
                      size="small"
                      // color=""
                      sx={{
                        background: "black",
                        color: "white",
                        maxHeight: "30px",
                      }}
                      variant="contained"
                      startIcon={<BlockOutlined />}
                    >
                      Learn more
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ margin: "1rem 0" }} />
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </CustomDrawer>
  );
};

export default Roles;
