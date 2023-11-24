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
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import companyInfo from "../../../../lib/data.json";
import { ICompany } from "../../../../types/company";
import { Protect } from "../../../../components/auth/requireAuth";
import { useNavigate, useParams } from "react-router";
import { ArrowBackTwoTone } from "@mui/icons-material";
import NewRoleForm from "./RoleForm";
import { useGetClientQuery } from "../../../../store/services/ClientServce";
import FullscreenProgress from "../../../../components/FullscreenProgress/FullscreenProgress";

const ClientDetails = () => {
  const { clientDetails } = companyInfo as ICompany;
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isError, isLoading, isFetching } = useGetClientQuery({
    id: +id,
  });
  const [open, setOpen] = React.useState(false);
  console.log(data);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (isLoading || isFetching) {
    return <FullscreenProgress />;
  }
  return (
    <Container maxWidth="lg">
      <Tooltip arrow placement="top" title="Go back">
        <IconButton
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ p: 2, mr: 2 }}
        >
          <ArrowBackTwoTone />
        </IconButton>
      </Tooltip>

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
              <Button
                sx={{ my: 2 }}
                onClick={handleClickOpen}
                variant="contained"
              >
                Add new Role
              </Button>
              <NewRoleForm
                onClose={handleClose}
                // onOPen={handleClickOpen}
                open={open}
              />
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
