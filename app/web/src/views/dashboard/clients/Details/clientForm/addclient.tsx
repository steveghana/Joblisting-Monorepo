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
// Define an interface for the form data
export interface FormData {
  companyInfo?: CompanyInfoData;
  projectDetails?: ProjectDetailsData;
  additionalData?: AdditionalDataData;
  communicationPreferences?: CommunicationPreferencesData;
  reviewAndSubmit?: ReviewAndSubmitData;
}
enum FormStep {
  CompanyInfo = 0,
  ProjectDetails = 1,
  AdditionalData = 2,
  CommunicationPreferences = 3,
  ReviewAndSubmit = 4,
}
// Define types for each step
type CompanyInfoData = {
  // Define properties for CompanyInfoData
};

type ProjectDetailsData = {
  // Define properties for ProjectDetailsData
};

type AdditionalDataData = {
  // Define properties for AdditionalDataData
};

type CommunicationPreferencesData = {
  // Define properties for CommunicationPreferencesData
};

type ReviewAndSubmitData = {
  // Define properties for ReviewAndSubmitData
};
const AddClientForm = () => {
  const [step, setStep] = useState<FormStep>(FormStep.CompanyInfo);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleNext = (data: any) => {
    setFormData((prevData) => ({ ...prevData, [step]: data }));
    setStep(nextStep(step));
  };

  const handleBack = () => setStep(prevStep);

  const nextStep = (currentStep: FormStep): FormStep => {
    // Define the logic to determine the next step based on the current step
    switch (currentStep) {
      case FormStep.CompanyInfo:
        return FormStep.ProjectDetails;
      case FormStep.ProjectDetails:
        return FormStep.AdditionalData;
      case FormStep.AdditionalData:
        return FormStep.CommunicationPreferences;
      case FormStep.CommunicationPreferences:
        return FormStep.ReviewAndSubmit;
      default:
        return currentStep;
    }
  };

  const prevStep = (currentStep: FormStep): FormStep => {
    // Define the logic to determine the previous step based on the current step
    switch (currentStep) {
      case FormStep.ProjectDetails:
        return FormStep.CompanyInfo;
      case FormStep.AdditionalData:
        return FormStep.ProjectDetails;
      case FormStep.CommunicationPreferences:
        return FormStep.AdditionalData;
      case FormStep.ReviewAndSubmit:
        return FormStep.CommunicationPreferences;
      default:
        return currentStep;
    }
  };
  const renderStepComponent = (step: FormStep) => {
    switch (step) {
      case FormStep.CompanyInfo:
        return <CompanyInfo onNext={handleNext} />;
      case FormStep.ProjectDetails:
        return <ProjectDetails onNext={handleNext} />;
      case FormStep.AdditionalData:
        return <AdditionalData onNext={handleNext} />;
      case FormStep.CommunicationPreferences:
        return <CommunicationPreferences onNext={handleNext} />;
      case FormStep.ReviewAndSubmit:
        return (
          <ReviewAndSubmit formData={formData} onReviewSubmit={handleSubmit} />
        );
      default:
        return null;
    }
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
            {renderStepComponent(step)}
            {step !== FormStep.ReviewAndSubmit && (
              <Box display={"flex"} gap={1} sx={{ justifyContent: "center" }}>
                {step !== FormStep.CompanyInfo && (
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
