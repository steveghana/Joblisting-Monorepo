import React from "react";
import MainCard from "../../../components/MainCard";
import { Grid, Typography } from "@mui/material";
import { roleData } from "./roledata";

const RoleDetails = () => {
  return (
    <MainCard>
      <Grid container>
        <Grid item>
          <Typography variant="h3">{roleData.name}</Typography>
          <Typography variant="h4">{roleData.subName}</Typography>
          <Typography variant="body1">{roleData.description}</Typography>
        </Grid>
      </Grid>
    </MainCard>
  );
};
export default RoleDetails;
