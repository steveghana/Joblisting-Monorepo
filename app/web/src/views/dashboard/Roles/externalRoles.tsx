import { Grid } from "@mui/material";
import React from "react";
import RoleTabs from "./roleTabs";
import { useParams } from "react-router";
import Status404 from "../../status/Status404";

const ExternalRoles = () => {
  const roleIdTrueParams = window.location.href.split("rid=")[1];
  if (!roleIdTrueParams?.length) {
    return <Status404 />;
  }
  return (
    <Grid>
      <RoleTabs roleId={roleIdTrueParams} isExternal={true} />
    </Grid>
  );
};

export default ExternalRoles;
