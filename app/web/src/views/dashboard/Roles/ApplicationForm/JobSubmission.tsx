import React, { useState } from "react";
import PersonalInfoForm from "./Personalinfo";
import WorkExperienceForm from "./experience";
import SkillsForm from "./skills";
import AdditionalInfoForm from "./additionalnfo";
import { Grid } from "@mui/material";

const JobSubmissionContainer: React.FC = () => {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);

  const handlePersonalInfoSubmit = (values: any) => {
    // if (values.filter((value) => !value.name.length)) return;

    setFormData({ ...formData, ...values });
    setStep(step + 1);
  };

  const handleWorkExperienceSubmit = (values: any) => {
    setFormData({ ...formData, workExperience: values.workExperience });
    setStep(step + 1);
  };
  interface Skill {
    skillName: string;
  }

  const handleSkillsSubmit = (values: string[]) => {
    // if (values.filter((value) => !value.length)) return;
    setFormData({ ...formData, skills: values });
    setStep(step + 1);
  };

  // const handleAvailabilitySubmit = (value: string) => {
  //   setFormData({ ...formData, availability: value });
  //   setStep(step + 1);
  // };

  const handleAdditionalInfoSubmit = (value: string) => {
    setFormData({ ...formData, coverLetter: value });
    // Handle final form submission here
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <Grid>
      {step === 1 && <PersonalInfoForm onSubmit={handlePersonalInfoSubmit} />}
      {step === 2 && (
        <WorkExperienceForm
          onSubmit={handleWorkExperienceSubmit}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <SkillsForm onSubmit={handleSkillsSubmit} onBack={handleBack} />
      )}
      {/* {step === 4 && (
        <AvailabilityForm
          onSubmit={handleAvailabilitySubmit}
          onBack={handleBack}
        />
      )} */}
      {step === 4 && (
        <AdditionalInfoForm
          onSubmit={handleAdditionalInfoSubmit}
          onBack={handleBack}
        />
      )}
    </Grid>
  );
};

export default JobSubmissionContainer;
