// import { Helmet } from "react-helmet-async";
// import Footer from "../../../../../../components/Footer";

import { Grid, Container } from "@mui/material";

import ProfileCover from "../../../content/applications/Users/profile/ProfileCover";
import RecentActivity from "../../../content/applications/Users/profile/RecentActivity";
import { IUser, Iuser } from "../../../types/user";
import { userdata as user } from "../../../content/applications/Users/settings/userdata";
function ManagementUserProfile() {
  return (
    <>
      {/* <Helmet>
        <title>User Details - Management</title>
      </Helmet> */}
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover user={user} />
          </Grid>
          {user.jobtitle === "Ceo" && (
            <Grid item xs={12} md={4}>
              <RecentActivity />
            </Grid>
          )}
          {/* <Grid item xs={12} md={8}>
            <Feed />
          </Grid> */}
          {/* <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid>
          <Grid item xs={12} md={7}>
            <MyCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid> */}
        </Grid>
      </Container>
      {/* <Footer /> */}
    </>
  );
}
export default ManagementUserProfile;
// export default Protect(ManagementUserProfile, ["Ceo", "developer", "hr"]);
