import { Helmet } from "react-helmet-async";
import PageHeader from "../../../../../content/dashboards/home/PageHeader";
import PageTitleWrapper from "../../../../../components/PageTitleWrapper";
import { Container, Grid } from "@mui/material";
import Footer from "../../../../../components/Footer";

import AccountBalance from "../../../../../content/dashboards/home/AccountBalance";
import Wallets from "../../../../../content/dashboards/home/Wallets";
import AccountSecurity from "../../../../../content/dashboards/home/AccountSecurity";
import WatchList from "../../../../../content/dashboards/home/WatchList";

function DashboardCrypto() {
  return (
    <>
      <Helmet>
        <title>Sv tech Dashboard</title>
      </Helmet>
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

export default DashboardCrypto;
