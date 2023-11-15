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
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default ManagementUserProfile;
// export default Protect(ManagementUserProfile, ["Ceo", "developer", "hr"]);
