import { Box, Grid, Paper, Typography, CssBaseline } from "@mui/material";
export default function AuthWrapper2(props) {
  return (
    <>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", overflow: "hidden" }}
      >
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <Typography
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
            variant="h3"
          >
            What to display Here
          </Typography>{" "}
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {props.children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}