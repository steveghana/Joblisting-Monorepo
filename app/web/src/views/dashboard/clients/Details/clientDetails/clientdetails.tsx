// ClientDetailsPage.tsx
import React, { useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import NewRoleForm from "./Newrole";
import NewJobForm from "./newjobform"; // Import the NewJobForm component
import CustomButton from "../../../../../components/button";
import { IRoleData } from "../../../../../types/roles";
import ClientRoleTable from "./clientRolesTable";
import NoData from "../../../../../components/NoData";

const ClientDetailsPage: React.FC<{
  data: IRoleData[];
  onActionComplete: () => void;
}> = ({ data, onActionComplete }) => {
  const [openRoleForm, setOpenRoleForm] = useState(false);
  const [openJobForm, setOpenJobForm] = useState(false);

  const handleOpenRoleForm = () => {
    setOpenRoleForm(true);
  };

  const handleCloseRoleForm = () => {
    setOpenRoleForm(false);
  };

  const handleOpenJobForm = () => {
    setOpenJobForm(true);
  };

  const handleCloseJobForm = () => {
    setOpenJobForm(false);
  };

  return (
    <Grid item xs={12} sm={12}>
      <Paper elevation={2}>
        <Box p={2}>
          <CustomButton
            sx={{ my: 1 }}
            onClick={handleOpenRoleForm}
            variant="contained"
            text="
            Add new Role / Project
            "
          />
          <NewRoleForm onClose={handleCloseRoleForm} open={openRoleForm} />

          <NewJobForm onClose={handleCloseJobForm} open={openJobForm} />

          <Typography variant="h5" component="h2" gutterBottom>
            Roles Available
          </Typography>
          {!data?.length ? (
            <NoData />
          ) : (
            <ClientRoleTable
              data={data}
              handleOpenJobForm={handleOpenJobForm}
              onActionComplete={onActionComplete}
            />
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

export default ClientDetailsPage;
