import React from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from "@mui/material";
import companyInfo from "./data.json";
import { ICompany } from "../../../../types/company";
import { Protect } from "../../../../components/auth/requireAuth";

const ClientDetails = () => {
  const { clientDetails } = companyInfo as ICompany;
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Client Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3}>
            <Box p={2}>
              <Avatar
                variant="rounded"
                alt="Company Logo"
                src="company-logo.png"
              />
              <Typography variant="h5" component="h2">
                {clientDetails.companyName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {clientDetails.aboutTheCompany}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h5" component="h2" gutterBottom>
                Roles Available
              </Typography>
              <List>
                {clientDetails.developerRoles.map(
                  ({ role, description }, i) => (
                    <ListItem key={role}>
                      <ListItemAvatar>
                        <Avatar>{i}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={role} secondary={description} />
                    </ListItem>
                  )
                )}
              </List>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h5" component="h2" gutterBottom>
                About the Company
              </Typography>
              <Typography variant="body1">
                {clientDetails.aboutTheCompany}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h5" component="h2" gutterBottom>
                Team Members
              </Typography>
              <List>
                {clientDetails.teamMembers.map((member, i) => (
                  <ListItem key={member.name}>
                    <ListItemAvatar>
                      <Avatar src={member.profile} alt="developer">
                        {i}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.name}
                      secondary={member.role}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Protect(ClientDetails, ["Ceo"]);
