// NewRoleForm.tsx
import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import ProjectDetails from "../clientForm/projectdetails";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useFormData } from "../../../../../utils/Contexts/clientFormContext";
import { useAddRoleMutation } from "../../../../../store/services/role.service";
import { toast } from "react-toastify";

interface NewRoleFormProps {
  open: boolean;
  clientId: string;
  onClose: () => void;
}

const NewRoleForm: React.FC<NewRoleFormProps> = ({
  open,
  onClose,
  clientId,
}) => {
  const initialValues = {
    title: "",
    devsNeeded: "",
    methodology: "",
    aboutTheProject: "",
    experience: "",
    communicationPreferences: "",
  };
  const { formDataState } = useFormData();
  const [createRole, { isLoading }] = useAddRoleMutation();

  const handleSubmit = async (values) => {
    try {
      const response = await createRole({ ...values, clientId }).unwrap();
      if (!isLoading && response) {
        toast.success("Role Added Successfully", {
          position: "bottom-center",
        });
        onClose();
      }
    } catch (error) {
      toast.error("Error submitting data", {
        position: "bottom-center",
      });
      return error;
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Role</DialogTitle>
      <PerfectScrollbar
        component="div"
        style={{
          //   height: "calc(100vh - 88px)",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <DialogContent>
          <ProjectDetails
            atClientPage={true}
            handleExternalSubmit={(values) => handleSubmit(values)}
          />
        </DialogContent>
      </PerfectScrollbar>
    </Dialog>
  );
};

export default NewRoleForm;
