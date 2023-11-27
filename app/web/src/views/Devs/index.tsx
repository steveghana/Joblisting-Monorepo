import PageHeader from "../../components/Transactions/PageHeader";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import { Grid, Container, Button } from "@mui/material";
// import Footer from "../../../../../components/Footer";

import RecentOrders from "../../components/Transactions/RecentOrders";
import { Protect } from "../../components/auth/requireAuth";
import MainCard from "../../components/MainCard";
import DevTableData from "./devColumns";

function ApplicationsTransactions() {
  return (
    <>
      {/* <Helmet>
        <title>Transactions - Applications</title>
      </Helmet> */}
      <MainCard>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <DevTableData />
              {/* <RecentOrders /> */}
            </Grid>
          </Grid>
        </Container>
        {/* <Footer /> */}
      </MainCard>
    </>
  );
}
// export default Protect(ApplicationsTransactions, ["Ceo"]);
export default ApplicationsTransactions;
