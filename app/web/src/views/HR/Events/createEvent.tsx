// EventForm.jsx
import React from "react";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
// import "./CreateEvent.css"; // Make sure to import your CSS file
import { toast } from "react-toastify";

const EventForm = () => {
  const EventBaseURL = `https://my-cal-com-backend.vercel.app`;
  const UserEmail = localStorage.getItem("useremail");
  const UserName = localStorage.getItem("username");

  const initialValue = {
    event_name: "",
    event_option: "",
    starttime: "",
    event_color: "",
    endtime: "",
    startDate: "",
    endDate: "",
    event_link: "",
    event_description: "",
  };
  const validationSchema = Yup.object({
    event_name: Yup.string().required("Event name is required"),
    event_option: Yup.string().required("Location is required"),
    starttime: Yup.string().required("Start time is required"),
    event_color: Yup.string().required("Color is required"),
    endtime: Yup.string().required("End time is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("End date is required"),
    event_link: Yup.string().required("Event link is required"),
    event_description: Yup.string(),
  });
  const handleFormSubmit = async (values) => {
    try {
      let response = await fetch(`${EventBaseURL}/events/newevent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          UserEmail: UserEmail,
        },
        body: JSON.stringify({
          ...values,
          userEmail: UserEmail,
          createdOn: new Date().toISOString().split(".")[0],
        }),
      });

      let eventData = await response.json();

      if (eventData.Created) {
        toast.success("Event Created! Your Event has been Scheduled.");
        setTimeout(() => {
          window.location.href = "./Dashboard.html";
        }, 2000);
      } else {
        let overLappTitle = eventData.OverlappingEvent.title;
        let overLapStart = eventData.OverlappingEvent.start;
        let overLapEnd = eventData.OverlappingEvent.end;

        toast.warning(
          `Event Cannot Be Created! Over-Lapping Event Name: ${overLappTitle} 
          Starts: ${overLapStart}
          Ends: ${overLapEnd}
          Please Readjust date & time to create this event`
        );
      }
    } catch (error) {
      toast.error(`Server Error: ${error}`);
      console.log(error);
    }
  };
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <hr />
          <div id="event_nav">{/* Your navigation JSX */}</div>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} className="margins">
            <div id="eventformtop">{/* Your form top JSX */}</div>
            <hr />
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              <Form id="EventForm">
                <div className="FlexEvent">
                  <Field
                    as={TextField}
                    id="event_name"
                    name="event_name"
                    label="Event Name"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    as={TextField}
                    id="event_option"
                    name="event_option"
                    label="Location"
                    variant="outlined"
                    fullWidth
                  />
                </div>

                <div className="FlexEvent">
                  <Field
                    as={TextField}
                    id="starttime"
                    name="starttime"
                    label="Start Time"
                    variant="outlined"
                    fullWidth
                    type="time"
                  />
                  <Field
                    as={TextField}
                    id="endtime"
                    name="endtime"
                    label="End Time"
                    variant="outlined"
                    fullWidth
                    type="time"
                    // error={
                    //   formik.touched.endtime && Boolean(formik.errors.endtime)
                    // }
                    // helperText={formik.touched.endtime && formik.errors.endtime}
                  />
                </div>

                <div className="FlexEvent">
                  <Field
                    as={TextField}
                    id="startDate"
                    name="startDate"
                    label="Start Date"
                    variant="outlined"
                    fullWidth
                    type="date"
                    // error={
                    //   formik.touched.startDate &&
                    //   Boolean(formik.errors.startDate)
                    // }
                    // helperText={
                    //   formik.touched.startDate && formik.errors.startDate
                    // }
                  />
                  <Field
                    as={TextField}
                    id="endDate"
                    name="endDate"
                    label="End Date"
                    variant="outlined"
                    fullWidth
                    type="date"
                  />
                </div>

                <div className="FlexEvent">
                  <Field
                    as={TextField}
                    id="event_link"
                    name="event_link"
                    label="Event Link"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    as={TextField}
                    id="event_description"
                    name="event_description"
                    label="Event Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                  />
                </div>

                <div className="next_cancel bot">
                  <Button id="CancelButtonW" className="cancelbutton">
                    Cancel
                  </Button>
                  <Button
                    id="NextButtonW"
                    type="submit"
                    className="nextbutton"
                    // disabled={isSubmitting}
                  >
                    Next
                  </Button>
                </div>
              </Form>
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventForm;
