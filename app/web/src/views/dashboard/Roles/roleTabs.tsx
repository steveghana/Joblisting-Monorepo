import {
  Avatar,
  ButtonBase,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SubCard from "../../../components/SubCard";
import React, { ChangeEvent, useState } from "react";
import { Box, styled, useTheme } from "@mui/system";
import RoleDetails from "./roledetails";
import { Close } from "@mui/icons-material";
import { themePalette } from "../../../themes/schemes/palette";
import JobsPage from "./JobsTab";
import ApplicantTable from "./Applicants";
import { useGetRoleQuery } from "../../../store/services/roleService";
import FullscreenProgress from "../../../components/FullscreenProgress/FullscreenProgress";
import NoData from "../../../components/NoData";
import { useGetClientQuery } from "../../../store/services/ClientServce";
const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);
type IRoleTabs = {
  setOpenDrawer: (
    value: React.SetStateAction<{
      bottom: boolean;
    }>
  ) => void;
  openDrawer: {
    bottom: boolean;
  };
  roleId: string;
  clientId: string;
};
const RoleTabs = (props: IRoleTabs) => {
  const theme = useTheme();
  // const { data, isError, isLoading, isFetching, error } = useGetRoleQuery({
  //   id: props.roleId,
  // });
  const {
    data: role,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetRoleQuery({
    id: props.roleId,
  });
  // Empty dependency array ensures the effect runs only once after the initial render

  const isLargerScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [currentTab, setCurrentTab] = React.useState<string>("overview");
  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "jobs", label: "Jobs" },
    { value: "applicants", label: "Applicants" },
  ];
  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    //dont propagate to the drawer component
    event.stopPropagation();
    setCurrentTab(value);
  };
  if (isLoading || isFetching) {
    return <FullscreenProgress />;
  }
  return (
    <Grid
      // container
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      onKeyUp={(e) => e.stopPropagation()}
    >
      <Grid position={"relative"}>
        <SubCard>
          <Container maxWidth="lg">
            <Grid
              // item
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              // spacing={3}
            >
              <ButtonBase>
                <Close
                  fontSize="medium"
                  onClick={() =>
                    props.setOpenDrawer({
                      ...props.openDrawer,
                      ["bottom"]: false,
                    })
                  }
                  sx={{
                    background: themePalette.grey[100],
                    p: 0.3,
                    borderRadius: "50%",
                    position: "fixed",
                    right: "0",
                    translate: {
                      lg: "-3rem -2vh",
                      sm: "-3rem -1vh",
                      xs: "-3rem -6vh",
                    },
                  }}
                />
              </ButtonBase>
              <Box
                sx={{ width: "100%" }}
                display={"flex"}
                gap={1}
                mt={2}
                p={{ lg: 2, md: 1, sm: 0 }}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  variant="rounded"
                  src={role.client.companyLogo}
                />
                <Box>
                  <Typography variant="h4">
                    {role.client.companyName}
                  </Typography>
                  <Typography>
                    {role.client.aboutTheCompany}
                    {/* Makes cloud security simple, contextual and automated for
                    customers */}
                  </Typography>
                </Box>
              </Box>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <TabsWrapper
                  onChange={handleTabsChange}
                  value={currentTab}
                  variant="scrollable"
                  scrollButtons="auto"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  {tabs.map((tab) => {
                    // Only render the "People" tab on larger screens
                    if (tab.value === "people" && !isLargerScreen) {
                      return null;
                    }
                    return (
                      <Tab
                        sx={{ fontSize: ".7rem" }}
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                      />
                    );
                  })}
                </TabsWrapper>
              </Grid>

              <Grid item xs={12}>
                {currentTab === "overview" && (
                  <RoleDetails setCurrentTab={setCurrentTab} role={role} />
                )}
                {currentTab === "jobs" && (
                  <JobsPage
                    job={role.jobs}
                    client={role.client}
                    roleId={role.id}
                  />
                )}
              </Grid>
            </Grid>
          </Container>
        </SubCard>
      </Grid>
      {currentTab === "applicants" && (
        <Box my={1}>
          <ApplicantTable roleid={role.id} />
        </Box>
      )}
    </Grid>
  );
};
export default RoleTabs;
