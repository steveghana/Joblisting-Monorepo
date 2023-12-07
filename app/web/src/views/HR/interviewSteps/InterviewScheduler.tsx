import React, { useState } from "react";
import SelectApplicant from "./SelectParticipants";
import ConfirmInterviewDetails from "./ConfirmInterviewDetails";
import InterviewScheduled from "./InterviewScheduled";

const InterviewScheduler: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [interviewType, setInterviewType] = useState<string>("");
  const [selectedApplicant, setSelectedApplicant] = useState({
    candidate: false,
    interviewer: false,
  });
  const [selectedInterviewDate, setSelectedInterviewDate] =
    useState<Date | null>(null);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleApplicantSelected = (applicant: {
    candidate: boolean;
    interviewer: boolean;
  }) => {
    setSelectedApplicant(applicant);
    handleNextStep();
  };

  const handleClose = () => {
    // Reset state when the dialog is closed
    setCurrentStep(1);
    setInterviewType("");
    setSelectedApplicant({ candidate: false, interviewer: false });
    setSelectedInterviewDate(null);
  };

  return (
    <div>
      {/* <InterviewScheduled onClose={handleClose} />; */}
      <SelectApplicant onNext={(values) => console.log(values)} />
    </div>
  );
};

export default InterviewScheduler;
