import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CardActions,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useNavigate } from "react-router";
import CompanyInfo from "./clientdetailsForm";
import ProjectDetails from "./projectdetails";
import AdditionalData from "./addtionallInfo";
import CommunicationPreferences from "./communicationPref";
import ReviewAndSubmit from "./review";
import { Protect } from "../../../../../components/auth/requireAuth";
import SubCard from "../../../../../components/SubCard";
import CustomButton from "../../../../../components/button";

const steps = [
  "Company Info",
  "Project Details",
  "Additional Data",
  "Communication Preferences",
  "Review and Submit",
];
type Form = {};
const AddClientForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleNext = (data, step) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => prevStep + 1);
  };
  const handleSkipTonext = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => setStep((prevStep) => prevStep - 1);
  const handleEdit = (targetStep) => {
    // When the "Edit" button is clicked, go back to the relevant step
    setStep(targetStep);
  };
  const handleSubmit = (values) => {
    console.log("submitted");
    // Combine all form data and submit as needed
    const finalFormData = { ...formData, ...values };
    console.log("Final Form Data:", finalFormData);
    // Add your submission logic here

    // For demonstration purposes, navigate to a success page
    // navigate("/success");
  };

  return (
    <Grid container>
      <Grid item md={12} sm={12}>
        <Typography variant="h4"></Typography>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid mt={2}>
          <SubCard>
            {step === 0 && <CompanyInfo onNext={handleNext} />}
            {step === 1 && <ProjectDetails onNext={handleNext} />}
            {step === 2 && <AdditionalData onNext={handleNext} />}
            {step === 3 && <CommunicationPreferences onNext={handleNext} />}
            {step === 4 && (
              <ReviewAndSubmit
                formData={formData}
                onReviewSubmit={handleSubmit}
                onEdit={(newstep) => handleEdit(newstep)}
              />
            )}
            {step < 4 && (
              <Box display={"flex"} gap={1} sx={{ justifyContent: "center" }}>
                {step > 0 && (
                  <CustomButton
                    text="Back"
                    type="button"
                    variant="outlined"
                    onClick={handleBack}
                  />
                )}
                {/* <Button
              type="button"
              variant="contained"
              onClick={() => navigate("/dashboard")}
              >
              Cancel
            </Button> */}
                <CustomButton
                  text=" Skip to Next Step"
                  type="button"
                  variant="contained"
                  onClick={handleSkipTonext}
                />
              </Box>
            )}
          </SubCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Protect(AddClientForm, ["Ceo"]);
