import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { IDev } from "../../../../types/devs";
import NoData from "../../../../components/NoData";
type IClientEmployees = {
  devs: IDev[];
};
function ClientEmployees({ devs }: IClientEmployees) {
  if (!devs.length) {
    return <NoData />;
  }
  return (
    <Grid item xs={12}>
      <Paper elevation={3}>
        <Box p={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Team Members
          </Typography>
          <List>
            {devs?.length &&
              devs.map((member, i) => (
                <ListItem key={member.id}>
                  <ListItemAvatar>
                    <Avatar src={member.avatar} alt="developer">
                      {i}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={member.firstName}
                    secondary={member.jobTitle}
                  />
                  <Typography>Name of Project: {member.projectName}</Typography>
                  <Typography>Start Date: {member.startDate}</Typography>
                </ListItem>
              ))}
          </List>
        </Box>
      </Paper>
    </Grid>
  );
}

export default ClientEmployees;
