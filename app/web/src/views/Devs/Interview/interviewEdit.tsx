import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import CustomButton from "../../../components/button";
// import SelectParticipants, {
//   InterviewFormValue,
// } from "../../HR/interviewSteps/SelectParticipants";
import { Iinterviews, InterviewFormValue } from "../../../types/interviews";
import { IDev } from "../../../types/devs";
import { useNavigate, useParams } from "react-router";
import { useGetInterviewQuery } from "../../../store/services/interview.service";
import { useTypedSelector } from "../../../store";
import { toast } from "react-toastify";
import Demo from "../../HR/Events/demo";
import NoData from "../../../components/NoData";
import FullscreenProgress from "../../../components/FullscreenProgress/FullscreenProgress";
import MainCard from "../../../components/MainCard";

const InterviewEdit = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: interviewEditData,
    isFetching,
    isError,
    isLoading,
    refetch,
  } = useGetInterviewQuery({ id });

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const devsAndApplicants = useTypedSelector((state) => state.devs.devs);
  if (isFetching || isLoading) {
    return <FullscreenProgress />;
  }
  if (!interviewEditData || !devsAndApplicants) {
    return <NoData />;
  }
  const __applicant = devsAndApplicants.filter(
    (applicant) =>
      applicant.id !== interviewEditData?.candidate.id &&
      applicant.rolestatus === "Pending"
  );
  const interviewers = devsAndApplicants.filter(
    (interviewer) =>
      interviewer.id !== interviewEditData?.interviewer.id &&
      interviewer?.rolestatus === "Accepted"
  );

  console.log(interviewEditData.candidate, "data");
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
  console.log(__applicant, "this is the applicant");
  const handleEdit = (value: InterviewFormValue) => {};
  return (
    <MainCard title={"Edit Interview"}>
      <Demo
        handleSubmit={(values) => console.log(values)}
        _applicants={[interviewEditData?.candidate, ...__applicant]}
        interviewers={[interviewEditData?.interviewer, ...interviewers]}
        handleEdit={(values) => handleEdit(values)}
        isEditing={true}
        editableInterviewInfo={interviewEditData}
      />
      {/* Your form or input fields for editing */}
    </MainCard>
  );
};

export default InterviewEdit;
