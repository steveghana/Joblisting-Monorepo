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
import React, { ChangeEvent } from "react";
import { Box, styled, useTheme } from "@mui/system";
import RoleDetails from "./roledetails";
import { Close } from "@mui/icons-material";
import { themePalette } from "../../../themes/schemes/palette";
import JobsPage from "./JobsTab";
import ApplicantTable from "./Applicants";
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
};
const RoleTabs = (props: IRoleTabs) => {
  const theme = useTheme();
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
  return (
    <Grid onClick={(e) => e.stopPropagation()}>
      <Grid item position={"relative"}>
        <SubCard>
          <Container maxWidth="lg">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={3}
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
                p={2}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                <Avatar sx={{ width: 56, height: 56 }} variant="rounded" />
                <Box>
                  <Typography variant="h4">Smart Contract</Typography>
                  <Typography>
                    Makes cloud security simple, contextual and automated for
                    customers
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
                  <RoleDetails setCurrentTab={setCurrentTab} />
                )}
                {currentTab === "jobs" && <JobsPage />}
                {currentTab === "applicants" && <ApplicantTable />}
                {/* {currentTab === "notifications" && <NotificationsTab />} */}
              </Grid>
            </Grid>
          </Container>
        </SubCard>
      </Grid>
    </Grid>
  );
};
export default RoleTabs;
