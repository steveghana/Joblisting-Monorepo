import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTypedDispatch, useTypedSelector } from "../../../store";
import { fetchDevs } from "../../../store/slices/dev.slice";
import { toast } from "react-toastify";
import { useAddInterviewMutation } from "../../../store/services/interview.service";
import Demo from "../Events/demo";
import { InterviewFormValue } from "../../../types/interviews";

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
  // const [addInterview, { isError, isLoading }] = useAddInterviewMutation();

  useEffect(() => {
    dispatch(fetchDevs());
  }, []);
  const __state = useTypedSelector((state) => state.devs.devs);
  const editableApplicant =
    id &&
    __state.filter((item) => item.id === id && item.rolestatus === "Pending");
  const applicants = __state.filter((item) => item.rolestatus === "Pending");
  const interviewers =
    __state?.length && __state.filter((item) => item.rolestatus === "Accepted");
  const [selectedInterviewDate, setSelectedInterviewDate] =
    useState<Date | null>(null);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  // const session = useSession();
  // const supabase = useSupabaseClient();
  // const { isLoading } = useSessionContext();

  // const handleGoogleSignIn = async () => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       scopes: "https://www.googleapis.com/auth/calendar",
  //     },
  //   });
  //   if (error) {
  //     console.error(
  //       "Error logging in to Google provider with Supabase:",
  //       error
  //     );
  //     toast.error("Failed to sign in with Google.");
  //   }
  // };

  const handleSignOut = async () => {
    // await supabase.auth.signOut();
  };

  const createCalendarEvent = async () => {
    console.log("Creating calendar event");
    {
      const event = {
        summary: eventName,
        description: eventDescription,
        start: {
          dateTime: start.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: end.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        attendees: [
          { email: "john@example.com" },
          { email: "jane@example.com" },
          { email: "your-email@example.com" }, // You can include or exclude yourself
        ],
      };
    }
    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            // Authorization: "Bearer " + session.provider_token,
          },
          body: JSON.stringify(event),
        }
      );
      const data = await response.json();
      console.log(data);
      toast.success("Event created, check your Google Calendar!");
    } catch (error) {
      console.error("Error creating calendar event:", error);
      toast.error("Failed to create the event. Please try again.");
    }
  };
  const handleSubmit = async (values: InterviewFormValue) => {
    // const {
    //   candidate,
    //   interviewDate,
    //   interviewType,
    //   interviewer,
    //   meetingLink,
    // } = values;
    // const trimedCandidate = candidate.trim().toLowerCase();

    // const candidateInfo = __state.find(
    //   (candidate) =>
    //     `${candidate.firstName} ${candidate.lastName}`.trim().toLowerCase() ===
    //     trimedCandidate
    // );
    // try {
    //   const response = await addInterview({
    //     candidateId: candidateInfo.id,
    //     interviewerId: interviewer.id,
    //     interviewType,
    //     meetingLink,
    //     scheduled_date: interviewDate,
    //     status: "Scheduled",
    //   }).unwrap();
    //   if (response && !isError) {
    //     dispatch(fetchDevs()); // update the persisted data
    //     navigate("/devs/interviews");
    //   }
    //   toast.success("interview Scheduled Succesfully", {
    //     position: "bottom-center",
    //   });
    // } catch (error) {
    //   toast.error("Could not Schedule interview", {
    //     position: "bottom-center",
    //   });
    // }
    console.log(values);
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
      <Demo
        isEditing={false}
        editableInterviewInfo={null}
        _applicants={editableApplicant || applicants}
        interviewers={interviewers}
        handleSubmit={(values) => handleSubmit(values)}
        handleEdit={(values) => handleEdit(values)}
      />
    </div>
  );
};

export default InterviewScheduler;
