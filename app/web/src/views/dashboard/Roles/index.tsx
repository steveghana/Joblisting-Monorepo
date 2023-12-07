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
import RoleTabs from "./roleTabs";
import { useGetRolesQuery } from "../../../store/services/roleService";
import { IRoleData } from "../../../types/roles";
import FullscreenProgress from "../../../components/FullscreenProgress/FullscreenProgress";
import NoData from "../../../components/NoData";
import { ClockIcon } from "@mui/x-date-pickers";
import { formatTimeDifference } from "../../../utils/timeFormatter";
import { EmploymentType } from "../../../lib/data/formFieldData";

const Roles = () => {
  const { data, isLoading, isFetching, isError } = useGetRolesQuery();
  if (isLoading || isFetching) {
    return <FullscreenProgress />;
  }
  return (
    <MainCard title={"Roles"}>
      <Grid container>
        {!data?.length ? (
          <NoData />
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2 }}>
            {data?.map((role, index) => (
              <RoleCard key={index} role={role} />
            ))}
          </Grid>
        )}
        {/* <Typography variant="h4" fontWeight={700} textAlign={"center"} m={2}>
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
        </Grid> */}
      </Grid>
    </MainCard>
  );
};
interface IRoleCard {
  feature?: boolean;
  role: IRoleData;
}
const RoleCard = (props: IRoleCard) => {
  const [openDrawer, setOpenDrawer] = React.useState({
    bottom: false,
  });
  const {
    aboutTheProject,
    durationForEmployment,
    experience,
    title,
    vacancy_status,
    client,
    createdAt,
    jobs,
  } = props?.role;

  // Create a relative time formatter in your locale
  // with default values explicitly passed in.

  const now = new Date();
  const date = new Date(createdAt);
  return (
    <>
      {jobs?.map((job, i) => (
        <CustomDrawer
          key={i}
          component={
            <RoleTabs
              setOpenDrawer={setOpenDrawer}
              openDrawer={openDrawer}
              roleId={props.role.id}
              clientId={props.role.client.id}
            />
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
                <Grid
                  className="avatar"
                  display={"flex"}
                  alignItems={"flex-start"}
                  gap={0.8}
                  item
                >
                  <Avatar
                    alt="user"
                    variant="rounded"
                    src={client.companyLogo}
                  />
                  <Box mr={"auto"}>
                    <Typography
                      fontWeight={500}
                      variant={props.feature ? "h5" : "h4"}
                      mr={"auto"}
                    >
                      {client.companyName}
                    </Typography>
                    <Typography variant="caption" fontWeight={700}>
                      {client.projectTitle}
                    </Typography>
                    {/* {!props.feature && ( */}
                    <Box>
                      <Typography variant="caption" color={"black"}>
                        {client.aboutTheCompany}
                      </Typography>
                      <Box
                        sx={{ color: themePalette.primary.light }}
                        display={"flex"}
                        gap={".3rem"}
                        my={1}
                        alignItems={"center"}
                      >
                        <People sx={{ color: themePalette.primary.dark }} />
                        <Typography variant="caption" fontWeight={700}>
                          {client.numOfEmployees}
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
                <Grid mb={1} className="mail links" item>
                  {vacancy_status === "Open" && (
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
                  )}
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
                      {experience.toUpperCase()} - {job.roleName}
                    </Typography>
                    <Box display={"flex"} alignItems={"center"} gap={0.4}>
                      <Dot />
                      <Typography
                        fontWeight={400}
                        variant="subtitle1"
                        mr={"auto"}
                      >
                        {client.country.label}{" "}
                      </Typography>
                      <Dot />
                      <Typography>{job.jobType}</Typography>
                      <Dot />
                      <Typography fontWeight={700}>
                        {
                          EmploymentType.filter(
                            (item) => item.label === job.employmentType
                          )[0]?.value
                        }
                      </Typography>
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
                          <ClockIcon
                            sx={{
                              color: themePalette.primary.main,
                              fontSize: ".7rem",
                              mr: 0.2,
                            }}
                          />
                          Posted {formatTimeDifference(now, date)} ago
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
      ))}
    </>
  );
};

export default Roles;
