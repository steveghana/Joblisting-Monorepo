import { Helmet } from "react-helmet-async";
import PageHeader from "../../../../../content/applications/Transactions/PageHeader";
import PageTitleWrapper from "../../../../../components/PageTitleWrapper";
import { Grid, Container } from "@mui/material";
import Footer from "../../../../../components/Footer";

import RecentOrders from "../../../../../content/applications/Transactions/RecentOrders";
import { Protect } from "../../../../../components/auth/requireAuth";

function ApplicationsTransactions() {
  return (
    <>
      <Helmet>
        <title>Transactions - Applications</title>
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
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
export default Protect(ApplicationsTransactions, ["Ceo"]);
