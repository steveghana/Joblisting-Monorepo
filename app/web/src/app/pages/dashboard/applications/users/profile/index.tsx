import { Helmet } from "react-helmet-async";
import Footer from "../../../../../../components/Footer";

import { Grid, Container } from "@mui/material";

import ProfileCover from "../../../../../../content/applications/Users/profile/ProfileCover";
import RecentActivity from "../../../../../../content/applications/Users/profile/RecentActivity";
import Feed from "../../../../../../content/applications/Users/profile/Feed";
import PopularTags from "../../../../../../content/applications/Users/profile/PopularTags";
import MyCards from "../../../../../../content/applications/Users/profile/MyCards";
import Addresses from "../../../../../../content/applications/Users/profile/Addresses";
import { Protect } from "../../../../../../components/auth/requireAuth";

function ManagementUserProfile() {
  const user = {
    savedCards: 7,
    name: "itai azogui",
    coverImg: "/static/images/placeholders/covers/5.jpg",
    avatar: "/static/images/avatars/4.jpg",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
    jobtitle: "Web Developer",
    location: "Barcelona, Spain",
    followers: "465",
  };

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
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
          <Grid item xs={12} md={8}>
            <Feed />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid>
          <Grid item xs={12} md={7}>
            <MyCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
export default ManagementUserProfile;
// export default Protect(ManagementUserProfile, ["Ceo", "developer", "hr"]);
