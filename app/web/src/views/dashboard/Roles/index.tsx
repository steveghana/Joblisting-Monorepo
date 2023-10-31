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
import Dot from "../../../components/Dot";
import RoleDetails from "./roleTabs";

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
          columns={{ xs: 2, md: 4, lg: 16 }}
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
      component={
        <RoleDetails setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
      }
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
          <Grid container direction="column" spacing={0}>
            <Grid className="avatar" display={"flex"} gap={0.8} item>
              <Avatar alt="user" variant="rounded" />
              <Box mr={"auto"}>
                <Typography
                  fontWeight={500}
                  variant={props.feature ? "h5" : "h4"}
                  mr={"auto"}
                >
                  Smart Contract
                </Typography>
                {/* {!props.feature && ( */}
                <Box>
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
                </Box>
                {/* )} */}
              </Box>
              {!props.feature && (
                <ButtonBase>
                  <MoreHoriz fontSize={"small"} />
                </ButtonBase>
              )}
            </Grid>
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
                borderRadius={2}
                p={1}
                border={"2px solid rgba(0, 0, 0, 0.1)"}
                display={"flex"}
                flexWrap={"wrap"}
              >
                <Typography fontWeight={700} variant="body2">
                  Fullstack Developer with Nodejs and React skills -{" "}
                  <b>Fulltime</b>
                </Typography>
                <Box display={"flex"} alignItems={"center"} gap={0.4}>
                  <Typography fontWeight={400} variant="subtitle1" mr={"auto"}>
                    Isreal{" "}
                  </Typography>
                  <Dot />
                  <Typography>Remote</Typography>
                </Box>
                <Box
                  sx={{
                    ml: { md: 0, lg: "auto" },
                    flexDirection: { sm: "column", md: "row" },
                    justifyContent: { sm: "flex-end", md: "flex-start" },
                  }}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  flexWrap={"wrap"}
                  alignItems={"center"}
                  flexDirection={props.feature ? "column" : "row"}
                  gap={1}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    sx={{
                      justifyContent: { md: "flex-start", lg: "flex-end" },
                      alignItems: { md: "flex-start", lg: "flex-end" },
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      color={"green"}
                    >
                      Recruiter recently active
                    </Typography>
                    <Typography>
                      <AllInclusive
                        sx={{
                          color: themePalette.primary.main,
                          fontSize: ".7rem",
                          mr: 0.2,
                        }}
                      />
                      Posted 4 weeks ago
                    </Typography>
                  </Box>
                  <Grid
                    display={"flex"}
                    sx={{
                      width: {
                        md: "100%",
                        lg: props.feature ? "100%" : "auto",
                      },
                    }}
                    //
                    justifyContent={"center"}
                    gap={0.5}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        color: "black",
                        borderColor: "black",
                        maxHeight: "30px",
                      }}
                    >
                      <Typography variant="caption">save</Typography>
                    </Button>
                    <Button
                      size="medium"
                      // color=""
                      fullWidth
                      sx={{
                        background: "black",
                        color: "white",
                        maxHeight: "30px",
                        width: "100%",
                      }}
                      variant="contained"
                    >
                      <Typography sx={{ wordBreak: "keep-all" }}>
                        Learn More
                      </Typography>
                    </Button>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </CustomDrawer>
  );
};

export default Roles;
