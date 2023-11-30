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
import companyInfo from "../../../../lib/data/data.json";
import { ICompany } from "../../../../types/company";
import { Protect } from "../../../../components/auth/requireAuth";
import { useNavigate, useParams } from "react-router";
import { ArrowBackTwoTone } from "@mui/icons-material";
import NewRoleForm from "./RoleForm";
import { useGetClientQuery } from "../../../../store/services/ClientServce";
import FullscreenProgress from "../../../../components/FullscreenProgress/FullscreenProgress";
import NoData from "../../../../components/NoData";
import { IClient } from "../../../../types/client";

const ClientDetailsOverview = ({ data }: { data: IClient }) => {
  const { clientDetails } = companyInfo as ICompany;

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
                {data.roles.map((role, i) => (
                  <ListItem key={role.id}>
                    <ListItemAvatar>
                      <Avatar>{i}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={role.title}
                      secondary={role.aboutTheProject}
                    />
                  </ListItem>
                ))}
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
export default Protect(ClientDetailsOverview, ["Ceo"]);
