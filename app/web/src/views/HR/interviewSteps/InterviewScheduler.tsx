import React, { useEffect, useState } from "react";
import SelectApplicant, { InterviewFormValue } from "./SelectParticipants";
import { useNavigate, useParams } from "react-router";
import { useTypedDispatch, useTypedSelector } from "../../../store";
import { fetchDevs } from "../../../store/slices/dev.slice";
import { toast } from "react-toastify";
import { useAddInterviewMutation } from "../../../store/services/interview.service";

const InterviewScheduler: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [interviewType, setInterviewType] = useState<string>("");
  const [selectedApplicant, setSelectedApplicant] = useState({
    candidate: false,
    interviewer: false,
  });
  const { id } = useParams();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [addInterview, { isError, isLoading }] = useAddInterviewMutation();

  useEffect(() => {
    dispatch(fetchDevs());
  }, []);
  const __state = useTypedSelector((state) => state.devs.devs);
  const __applicant =
    id &&
    __state.filter((item) => item.id === id && item.rolestatus === "Pending");
  const interviewers =
    __state?.length && __state.filter((item) => item.rolestatus === "Accepted");
  const [selectedInterviewDate, setSelectedInterviewDate] =
    useState<Date | null>(null);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const handleSubmit = async (values: InterviewFormValue) => {
    const {
      candidate,
      interviewDate,
      interviewType,
      interviewer,
      meetingLink,
    } = values;
    const trimedCandidate = candidate.trim().toLowerCase();

    const candidateInfo = __state.find(
      (candidate) =>
        `${candidate.firstName} ${candidate.lastName}`.trim().toLowerCase() ===
        trimedCandidate
    );
    try {
      const response = await addInterview({
        candidateId: candidateInfo.id,
        interviewerId: interviewer.id,
        interviewType,
        meetingLink,
        scheduled_date: interviewDate,
        status: "Scheduled",
      }).unwrap();
      if (response && !isError) {
        dispatch(fetchDevs()); // update the persisted data
        navigate("/devs/interviews");
      }
      toast.success("interview Scheduled Succesfully", {
        position: "bottom-center",
      });
    } catch (error) {
      toast.error("Could not Schedule interview", {
        position: "bottom-center",
      });
    }
    console.log(candidateInfo, values);
    // onNext(values);
  };
  const handleApplicantSelected = (applicant: {
    candidate: boolean;
    interviewer: boolean;
  }) => {
    setSelectedApplicant(applicant);
    handleNextStep();
  };
  const handleEdit = (values: InterviewFormValue) => {};
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
      <SelectApplicant
        editableInterviewInfo={null}
        _applicants={__applicant}
        interviewers={interviewers}
        handleSubmit={(values) => handleSubmit(values)}
        handleEdit={(values) => handleEdit(values)}
      />
    </div>
  );
};

export default InterviewScheduler;
