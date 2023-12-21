// NewJobForm.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import RoleInfo from './clientForm/addtionallInfo';
import { useAddJobMutation } from '../../../../store/services/role.service';
import { toast } from 'react-toastify';

interface NewJobFormProps {
  open: boolean;
  onClose: () => void;
  roleId: string;
}

const NewJobForm: React.FC<NewJobFormProps> = ({ open, onClose, roleId }) => {
  const [createJob, { isLoading }] = useAddJobMutation();

  const handleSubmit = async (values: any) => {
    console.log(values);
    try {
      const response = await createJob({ ...values, roleId }).unwrap();
      if (!isLoading && response) {
        toast.success('Job Added Successfully', {
          position: 'bottom-center',
        });
        onClose();
      }
    } catch (error) {
      toast.error('Error submitting data', {
        position: 'bottom-center',
      });
      return error;
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Job</DialogTitle>
      <PerfectScrollbar
        component="div"
        style={{
          height: 'calc(100vh - 88px)',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <DialogContent>
          <RoleInfo atClientPage={true} handleExternalSubmit={(values) => handleSubmit(values)} />
        </DialogContent>
      </PerfectScrollbar>
    </Dialog>
  );
};

export default NewJobForm;
