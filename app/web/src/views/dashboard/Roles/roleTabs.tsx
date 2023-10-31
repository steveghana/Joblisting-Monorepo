import { Container, Grid, Tab, Tabs } from "@mui/material";
import SubCard from "../../../components/SubCard";
import PerfectScrollbar from "react-perfect-scrollbar";

import React, { ChangeEvent } from "react";
import { styled } from "@mui/system";
import RoleDetails from "./roledetails";
const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);
const RoleTabs = () => {
  const [currentTab, setCurrentTab] = React.useState<string>("overview");
  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "jobs", label: "Jobs" },
    { value: "people", label: "People" },
  ];
  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    //dont propagate to the drawer component
    event.stopPropagation();
    setCurrentTab(value);
  };
  return (
    <Grid onClick={(e) => e.stopPropagation()} container>
      <Grid item>
        <SubCard>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={3}
              // height={"80%"}
            >
              <Grid item xs={12}>
                <TabsWrapper
                  onChange={handleTabsChange}
                  value={currentTab}
                  variant="scrollable"
                  scrollButtons="auto"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </TabsWrapper>
              </Grid>
              <Grid item xs={12}>
                {currentTab === "overview" && <RoleDetails />}
                {currentTab === "jobs" && <div>Jobs</div>}
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
