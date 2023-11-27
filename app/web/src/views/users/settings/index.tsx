import { useState, ChangeEvent } from "react";
import { Container, Tabs, Tab, Grid } from "@mui/material";
import Footer from "../../../components/Footer";
import { styled } from "@mui/material/styles";
import ActivityTab from "../../../components/settings/ActivityTab";
import EditProfileTab from "../../../components/settings/EditProfileTab";
import NotificationsTab from "../../../components/settings/NotificationsTab";
import SecurityTab from "../../../components/settings/SecurityTab";
import MainCard from "../../../components/MainCard";
const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);
function ManagementUserSettings() {
  const [currentTab, setCurrentTab] = useState<string>("profile");
  const tabs = [
    { value: "profile", label: "Profile" },
    { value: "edit_profile", label: "Edit Profile" },
    { value: "notifications", label: "Notifications" },
    { value: "security", label: "Passwords/Security" },
  ];
  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };
  return (
    <>
      {/* <Helmet>
        <title>User Settings - Applications</title>
      </Helmet> */}
      <MainCard>
        <Container maxWidth="lg">
          <Grid
          // container
          // direction="row"
          // justifyContent="center"
          // alignItems="stretch"
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
              {currentTab === "profile" && <ActivityTab insettings={true} />}
              {currentTab === "edit_profile" && <EditProfileTab />}
              {currentTab === "notifications" && <NotificationsTab />}
              {currentTab === "security" && <SecurityTab />}
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </MainCard>
    </>
  );
}
export default ManagementUserSettings;
// export default Protect(ManagementUserSettings, ["Ceo", "developer", "hr"]);
