import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import CustomButton from "../../../components/button";
import SelectParticipants, {
  InterviewFormValue,
} from "../../HR/interviewSteps/SelectParticipants";
import { Iinterviews } from "../../../types/interviews";
import { IDev } from "../../../types/devs";
type IEdit = {
  editDialogOpen: boolean;
  handleEditClose: () => void;
  interviewEditData: Iinterviews;
  devsAndApplicants: IDev[];
};
const InterviewEdit = ({
  editDialogOpen,
  handleEditClose,
  devsAndApplicants,
  interviewEditData,
}: IEdit) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const __applicant =
    !!devsAndApplicants.length &&
    devsAndApplicants.filter(
      (applicant) =>
        applicant.id !== interviewEditData.candidate.id &&
        applicant.rolestatus === "Pending"
    );
  const interviewers =
    !!devsAndApplicants?.length &&
    devsAndApplicants.filter(
      (interviewer) =>
        interviewer.id !== interviewEditData.interviewer.id &&
        interviewer.rolestatus === "Accepted"
    );
  const handleEdit = (value: InterviewFormValue) => {};
  return (
    <Paper elevation={1}>
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Interview</DialogTitle>
        <DialogContent>
          <PerfectScrollbar
            component="div"
            style={{
              height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <SelectParticipants
              _applicants={[interviewEditData.candidate, ...__applicant]}
              interviewers={[interviewEditData.interviewer, ...interviewers]}
              handleEdit={(values) => handleEdit(values)}
              isEditing={true}
              editableInterviewInfo={interviewEditData}
            />
          </PerfectScrollbar>
          {/* Your form or input fields for editing */}
        </DialogContent>
        <DialogActions>
          <CustomButton
            variant="outlined"
            fullWidth
            color="primary"
            type="submit"
            text="Cancel"
            onClick={handleEditClose}
          />
          <CustomButton
            color="primary"
            fullWidth
            type="submit"
            text="Save Changes"

            /* onClick={handleSaveChanges} */
          />
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default InterviewEdit;
