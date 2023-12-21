import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  CardActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepIconProps,
  styled,
  FormHelperText,
} from '@mui/material';
import { useNavigate } from 'react-router';
import CompanyInfo from './clientdetailsForm';
import ProjectDetails from './projectdetails';
import AdditionalData from './addtionallInfo';
import ReviewAndSubmit from './review';
import { Protect } from '../../../../../components/auth/requireAuth';
import SubCard from '../../../../../components/SubCard';
import CustomButton from '../../../../../components/button';
import { FormDataProvider, useFormData } from '../../../../../contexts/clientFormContext';
import { Call, Check, GroupAdd, PeopleAlt, Settings, VerifiedUserRounded, VideoLabel, Work } from '@mui/icons-material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
const steps = ['Company Info', 'Project Details', 'Additional Data', 'Review and Submit'];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <PeopleAlt />,
    2: <Work />,
    3: <VideoLabel />,
    4: <Check />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
const AddClientForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { formDataState } = useFormData();

  const navigate = useNavigate();

  const handleNext = (data, step) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: { ...data },
    }));
    setStep((prevStep) => prevStep + 1);
  };
  const handleSkipTonext = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => {
    const previousStep = step - 1;
    const previousFormData = formData[previousStep];

    // If there is data for the previous step, set it in the state
    if (previousFormData) {
      setFormData((prevData) => ({
        ...prevData,
        [previousStep]: { ...previousFormData },
      }));
    }

    setStep((prevStep) => prevStep - 1);
  };
  const handleEdit = (targetStep) => {
    // When the "Edit" button is clicked, go back to the relevant step
    setStep(targetStep);
  };

  return (
    <Grid container>
      <Grid item md={12} sm={12}>
        <Typography variant="h4"></Typography>
        <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* <Stepper activeStep={step} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
        <Grid mt={2}>
          <SubCard>
            {step === 0 && <CompanyInfo onNext={handleNext} />}
            {step === 1 && <ProjectDetails handleBack={handleBack} onNext={handleNext} />}
            {step === 2 && <AdditionalData handleBack={handleBack} onNext={handleNext} />}

            {step === 3 && (
              <ReviewAndSubmit
                formData={formData[step]}
                // onReviewSubmit={handleSubmit}
                onEdit={(newstep) => handleEdit(newstep)}
              />
            )}
            {/* <>
              {isError && (
                <FormHelperText error variant="filled">
                  {error as string}
                </FormHelperText>
              )}
            </> */}
            {step < 3 && (
              <Box display={'flex'} gap={1} sx={{ justifyContent: 'center' }}>
                <CustomButton text=" Skip to Next Step" type="button" variant="contained" onClick={handleSkipTonext} />
              </Box>
            )}
          </SubCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Protect(AddClientForm, ['Ceo']);