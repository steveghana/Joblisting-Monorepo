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

const ClientDetails = () => {
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
                Company Name
              </Typography>
              <Typography variant="body2" color="textSecondary">
                About the Company
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
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>1</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Role 1"
                    secondary="Role Description 1"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>2</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Role 2"
                    secondary="Role Description 2"
                  />
                </ListItem>
                {/* Add more roles as needed */}
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
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>1</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="John Doe"
                    secondary="Front-End Developer"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>2</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Jane Smith"
                    secondary="Back-End Developer"
                  />
                </ListItem>
                {/* Add more team members as needed */}
              </List>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientDetails;
