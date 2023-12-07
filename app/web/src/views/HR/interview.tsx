import React from "react";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface InterviewSchedulerProps {
  open: boolean;
  onClose: () => void;
}

const InterviewScheduler: React.FC<InterviewSchedulerProps> = ({
  open,
  onClose,
}) => {
  const formik = useFormik({
    initialValues: {
      interviewType: "",
      developerId: "",
      applicantName: "",
      interviewDate: "",
    },
    onSubmit: async (values) => {
      // Your logic to schedule the interview goes here
      // Use values.interviewType, values.developerId, values.applicantName, and values.interviewDate
      // Dispatch an action or make an API call to schedule the interview
      console.log(values);
      // For demonstration purposes, show a toast notification
      toast.success("Interview has been scheduled", {
        position: "top-right",
        autoClose: 5000,
      });

      // Reset form fields
      formik.resetForm();
      onClose(); // Close the dialog after scheduling
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Schedule Interview</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Interview Type"
            fullWidth
            id="interviewType"
            name="interviewType"
            value={formik.values.interviewType}
            onChange={formik.handleChange}
          />
          <TextField
            label="Developer"
            fullWidth
            id="developerId"
            name="developerId"
            value={formik.values.developerId}
            onChange={formik.handleChange}
          />
          <TextField
            label="Applicant Name"
            fullWidth
            id="applicantName"
            name="applicantName"
            value={formik.values.applicantName}
            onChange={formik.handleChange}
          />
          <TextField
            label="Interview Date"
            fullWidth
            type="date"
            id="interviewDate"
            name="interviewDate"
            value={formik.values.interviewDate}
            onChange={formik.handleChange}
          />
          <DialogActions>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Schedule
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default InterviewScheduler;
