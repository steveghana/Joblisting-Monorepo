import PropTypes from "prop-types";

// material-ui
import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { Paper, Button, TextField } from "@mui/material";
// project imports
import SubCard from "../../components/SubCard";
import MainCard from "../../components/MainCard";
import SecondaryAction from "../../components/CardSecondaryAction";
import { gridSpacing } from "../../store/constant";
import { useGetInterviewsQuery } from "../../store/services/interview.service";
import React from "react";

// ===============================|| INTERVIEWS ||=============================== //
const interviewDetails = {
  candidateName: "John Doe",
  interviewerName: "Jane Smith",
  interviewDate: "2023-12-15",
  interviewTime: "10:00 AM",
  location: "Zoom Meeting",
};

// Dummy data for comments
const comments = [
  { author: "Alice", text: "Great interview!" },
  { author: "Bob", text: "Candidate performed well." },
];
const Interviews = () => {
  const { data, isError, isLoading } = useGetInterviewsQuery();
  // Date: {
  //   format(new Date(interviewDetails.interviewDate), "yyyy-MM-dd");
  // }
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  // Assuming the data structure returned by the API has interview details
  //  const interviewDetails = data?.interviewDetails || {};

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };
  console.log(data, "interviews");
  return (
    <MainCard title="Interview Devs">
      <Grid container>
        <Grid item xs={12}>
          <SubCard>
            <Grid container spacing={3}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h4" align="center" gutterBottom>
                  Interview Details
                </Typography>
              </Grid>

              {/* Interview Information */}
              <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: "20px" }}>
                  <Typography variant="h6" gutterBottom>
                    Interview Overview
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">
                        Candidate: {interviewDetails.candidateName}
                      </Typography>
                      <Typography variant="subtitle1">
                        Interviewer: {interviewDetails.interviewerName}
                      </Typography>
                      <Typography variant="subtitle1">
                        Date: {interviewDetails.interviewDate}
                      </Typography>
                      <Typography variant="subtitle1">
                        Time: {interviewDetails.interviewTime}
                      </Typography>
                      <Typography variant="subtitle1">
                        Location: {interviewDetails.location}
                      </Typography>
                    </Grid>
                    {/* Additional interview details can be added here */}
                  </Grid>
                </Paper>
              </Grid>

              {/* Comments Section */}
              <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: "20px" }}>
                  <Typography variant="h6" gutterBottom>
                    Comments
                  </Typography>
                  {/* Display comments */}
                  {comments.map((comment, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <Typography variant="subtitle1">
                        <strong>{comment.author}:</strong> {comment.text}
                      </Typography>
                    </div>
                  ))}

                  {/* Add Comment Form */}
                  <form>
                    <TextField
                      label="Your Name"
                      variant="outlined"
                      fullWidth
                      style={{ marginBottom: "10px" }}
                    />
                    <TextField
                      label="Add a Comment"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={3}
                      style={{ marginBottom: "10px" }}
                    />
                    <Button variant="contained" color="primary" type="submit">
                      Add Comment
                    </Button>
                  </form>
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" onClick={handleEdit}>
                Edit Interview
              </Button>
            </Grid>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={handleEditClose}>
              <DialogTitle>Edit Interview</DialogTitle>
              <DialogContent>
                {/* Your form or input fields for editing */}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEditClose} color="primary">
                  Cancel
                </Button>
                <Button /* onClick={handleSaveChanges} */ color="primary">
                  Save Changes
                </Button>
              </DialogActions>
            </Dialog>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Interviews;
