import { useState, ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "../../../../../../content/applications/Users/settings/PageHeader";
import PageTitleWrapper from "../../../../../../components/PageTitleWrapper";
import { Container, Tabs, Tab, Grid } from "@mui/material";
import Footer from "../../../../../../components/Footer";
import { styled } from "@mui/material/styles";

import ActivityTab from "../../../../../../content/applications/Users/settings/ActivityTab";
import EditProfileTab from "../../../../../../content/applications/Users/settings/EditProfileTab";
import NotificationsTab from "../../../../../../content/applications/Users/settings/NotificationsTab";
import SecurityTab from "../../../../../../content/applications/Users/settings/SecurityTab";
import { Protect } from "../../../../../../components/auth/requireAuth";

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
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
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
            {currentTab === "profile" && <ActivityTab />}
            {currentTab === "edit_profile" && <EditProfileTab />}
            {currentTab === "notifications" && <NotificationsTab />}
            {currentTab === "security" && <SecurityTab />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
export default ManagementUserSettings;
// export default Protect(ManagementUserSettings, ["Ceo", "developer", "hr"]);
