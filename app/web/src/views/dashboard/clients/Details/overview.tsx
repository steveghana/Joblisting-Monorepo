import React from "react";
import { Container, Paper, Grid } from "@mui/material";
import { Protect } from "../../../../components/auth/requireAuth";
import NoData from "../../../../components/NoData";
import { IClient } from "../../../../types/client";
import { FormDataProvider } from "../../../../utils/Contexts/clientFormContext";
import ClientDetailsPage from "./demo/clientdetails";
import { IRoleData } from "../../../../types/roles";

const ClientDetailsOverview = ({ data }: { data: IRoleData[] }) => {
  const [open, setOpen] = React.useState(false);
  console.log(data);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (!data) {
    return <NoData />;
  }
  return (
    <Container maxWidth="lg">
      <Grid container spacing={1} mt={2}>
        <Grid item xs={12} sm={12}>
          <Paper elevation={2}>
            <FormDataProvider>
              <ClientDetailsPage data={data} />
            </FormDataProvider>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Protect(ClientDetailsOverview, ["Ceo"]);
