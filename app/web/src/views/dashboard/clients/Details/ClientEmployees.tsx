import { IDev } from "../../../../types/devs";
import NoData from "../../../../components/NoData";
import {
  AssignmentLate,
  AssignmentLateTwoTone,
  DeleteTwoTone,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Table,
  Grid,
  List,
  Paper,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  useTheme,
  Card,
  CardHeader,
  Divider,
  Avatar,
} from "@mui/material";
import { useState, MouseEvent, ChangeEvent } from "react";

import { format, subHours, subWeeks, subDays } from "date-fns";
import { logs } from "../../../../components/settings/SecurityTab";
type IClientEmployees = {
  devs: IDev[];
};
function ClientEmployees({ devs }: IClientEmployees) {
  const theme = useTheme();

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  console.log(devs);
  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (!devs.length) {
    return <NoData />;
  }
  return (
    <Grid item xs={12}>
      <Paper elevation={3}>
        <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title="Team Members"
            subheader="Team memeber for this client"
          />

          <Box p={2}>
            <List>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Experience</TableCell>
                      {/* <TableCell>Location</TableCell> */}
                      <TableCell>startDate</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {devs.map((dev) => (
                      <TableRow key={dev.id} hover>
                        <TableCell>
                          <Avatar src={dev.avatar} />
                        </TableCell>
                        <TableCell>
                          {dev.firstName} {dev.lastName}
                        </TableCell>
                        <TableCell>{dev.email}</TableCell>
                        <TableCell>{dev.role}</TableCell>
                        {/* <TableCell>{dev}</TableCell> */}
                        <TableCell>
                          {/* {format(
                            new Date(dev.startDate),
                            "dd MMMM, yyyy - h:mm:ss a"
                          )} */}
                          {dev.startedAt}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip placement="top" title="Unassign" arrow>
                            <IconButton
                              sx={{
                                "&:hover": {
                                  background: theme.colors?.error.lighter,
                                },
                                color: theme.palette.error.main,
                              }}
                              color="inherit"
                              size="small"
                            >
                              <AssignmentLateTwoTone fontSize="small" />
                              {/* <DeleteTwoTone fontSize="small" /> */}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box p={2}>
                <TablePagination
                  component="div"
                  count={100}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
              {/* <DevTableData /> */}
              {/* {devs?.length &&
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
              ))} */}
            </List>
          </Box>
          <Divider />
          {/*  */}
        </Card>
      </Paper>
    </Grid>
  );
}

export default ClientEmployees;
