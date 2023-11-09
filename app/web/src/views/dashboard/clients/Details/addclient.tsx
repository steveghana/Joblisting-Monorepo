import React, { useState } from "react";
import { Box, Typography, Grid, CardActions } from "@mui/material";
import { useNavigate } from "react-router";
import ClientInfo from "./clientdetailsForm"; // Import the ClientInfo component
import ProjectDetails from "./projectdetails"; // Import the ProjectDetails component
import CommunicationPreferences from "./communicationPref"; // Import the CommunicationPreferences component
import CustomButton from "../../../../components/button";
import { Protect } from "../../../../components/auth/requireAuth";

const AddClientForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleNext = (values) => {
    setFormData({ ...formData, ...values });
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (values) => {
    // Combine all form data and submit as needed
    const finalFormData = { ...formData, ...values };
    console.log("Final Form Data:", finalFormData);
    // Add your submission logic here

    // For demonstration purposes, navigate to a success page
    navigate("/success");
  };

  return (
    <Grid container>
      <Grid item md={12} sm={12}>
        <Typography variant="h4"></Typography>
        {currentStep === 1 && <ClientInfo onNext={handleNext} />}
        {currentStep === 2 && <ProjectDetails onNext={handleNext} />}
        {currentStep === 3 && (
          <CommunicationPreferences onSubmit={handleSubmit} />
        )}

        {/* {currentStep !== 1 && (
          <CardActions sx={{ justifyContent: "flex-end", pt: 2 }}>
            <CustomButton text="Back" variant="outlined" onClick={handleBack} />
          </CardActions>
        )} */}
      </Grid>
    </Grid>
  );
};

export default Protect(AddClientForm, ["Ceo"]);
