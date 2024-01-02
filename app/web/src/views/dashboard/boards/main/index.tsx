import PageHeader from "../../../../components/home/PageHeader";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import { Container, Grid } from "@mui/material";
import Footer from "../../../../components/Footer";
import { Protect } from "../../../../components/auth/requireAuth";
import AccountBalance from "../../../../components/home/AccountBalance";
import Wallets from "../../../../components/home/Wallets";
import AccountSecurity from "../../../../components/home/AccountSecurity";
import WatchList from "../../../../components/home/WatchList";

function Dashboard() {
  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Protect(Dashboard, ["Ceo", "Recruitment"]);
