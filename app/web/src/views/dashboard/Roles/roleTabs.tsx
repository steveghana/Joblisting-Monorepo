import { ButtonBase, Container, Grid, Tab, Tabs } from "@mui/material";
import SubCard from "../../../components/SubCard";
import PerfectScrollbar from "react-perfect-scrollbar";

import React, { ChangeEvent } from "react";
import { styled } from "@mui/system";
import RoleDetails from "./roledetails";
import { Close } from "@mui/icons-material";
import { themePalette } from "../../../themes/schemes/palette";
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
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </TabsWrapper>
                <ButtonBase>
                  <Close
                    onClick={() =>
                      props.setOpenDrawer({
                        ...props.openDrawer,
                        ["bottom"]: false,
                      })
                    }
                    sx={{
                      background: themePalette.dark.light,
                      p: 0.3,
                      borderRadius: "50%",
                    }}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12}>
                {currentTab === "overview" && (
                  <RoleDetails setCurrentTab={setCurrentTab} />
                )}
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
