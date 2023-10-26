import PropTypes from "prop-types";

// material-ui
import { Box, Card, Grid, Typography } from "@mui/material";

// project imports
import SubCard from "../../components/SubCard";
import MainCard from "../../components/MainCard";
import SecondaryAction from "../../components/CardSecondaryAction";
import { gridSpacing } from "../../store/constant";

// ===============================|| SHADOW BOX ||=============================== //

// ============================|| UTILITIES SHADOW ||============================ //

const Interviews = () => (
  <MainCard title="Basic Shadow">
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard title="Basic Shadow">
          <Grid container spacing={gridSpacing}>
            <Typography>This is the interview page</Typography>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  </MainCard>
);

export default Interviews;
