import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { Box, FormControl, FormHelperText, Grid, RadioGroup, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import CustomButton from '../../components/button';
import { useNavigate } from 'react-router';
import FullscreenProgress from '../../components/FullscreenProgress/FullscreenProgress';
import AuthFooter from '../../components/AuthFooter';
import LogoSection from '../../layout/MainLayout/LogoSection';
import { useLoginUserMutation } from '../../store/services/userAuth.service';
import { IProfession } from '../../types/roles';
import { toast } from 'react-toastify';
import { useTypedSelector } from '@/store';
import { motion } from 'framer-motion';
import { getRemainingRoles, isRegistrationAvailable } from '@/utils/checkvalid';
function RoleAuth() {
  const [error, setError] = useState(false);
  const [role, setRole] = useState<IProfession>();
  const navigate = useNavigate();
  const [helperText, setHelperText] = useState('');
  const [loginUser, { isLoading: isWithGoogleLoading }] = useLoginUserMutation();
  const state = useTypedSelector((state) => state.userApi);
  // const roles = ['Ceo', 'Recruitment'];
  let roles: string[] = JSON.parse(sessionStorage.getItem('rolesAvailable') as string) || [];
  const registrationAvailable = isRegistrationAvailable(roles as string[]);
  const remainingRoles = getRemainingRoles(roles as string[]);
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value as IProfession);
  };

  const onMoveToRegister = async () => {
    if (!role) {
      setError(true);
      setHelperText('Please select an option.');
      return;
    }
    if (!remainingRoles.length || registrationAvailable) {
      toast.warning(`You have reached the maximum number of registeration`, { position: 'bottom-center' });
      return false;
    }
    try {
      const { email, password }: { email: string; password: string } =
        JSON.parse(sessionStorage.getItem('tempUserinfo') as string) || {};

      const login = await loginUser({
        role,
        email,
        password,
        rememberMe: true,
      }).unwrap();

      if (!login) return;

      const { authTokenId, role: userRole } = login;
      if (!authTokenId) return;

      sessionStorage.setItem('auth_token', authTokenId);
      sessionStorage.setItem('role', userRole);
      //clear tempUserinfo
      sessionStorage.removeItem('tempUserinfo');
      navigate('/dashboard/default');
      toast.success(`Welcome aboard`, { position: 'top-center' });
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  if (isWithGoogleLoading) {
    return <FullscreenProgress />;
  }

  return (
    <motion.div
      key={window.location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Grid
        sx={{ height: '100vh' }}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        gap={2}
        alignItems="center"
      >
        <Grid>
          <LogoSection />
        </Grid>
        <Box display="flex" flexDirection="column" gap={1} alignItems="center">
          <Typography fontFamily="Didact Gothic" fontWeight={400} variant="h1">
            Let's sign you up
          </Typography>
          <Typography fontFamily="Lato" fontWeight={400} variant="caption" color="GrayText">
            Create a free account now and let's get started
          </Typography>
          <div>Select an Account Type</div>
        </Box>
        <FormControl sx={{ minWidth: '75%' }} margin="dense" error={error} variant="standard">
          <RadioGroup>
            {roles.map((roleName) => (
              <FormControlLabel
                key={roleName}
                control={<Radio />}
                label={roleName}
                sx={{
                  my: 1,
                  ml: 1.5,
                  borderRadius: '5px',
                  border: role === 'Ceo' ? '1px solid blue' : '1px solid gray',
                }}
                value={roleName}
                checked={role === roleName}
                onChange={handleRadioChange}
              />
            ))}
            <FormHelperText>{helperText}</FormHelperText>
          </RadioGroup>
          <CustomButton
            text="Continue"
            disabled={isWithGoogleLoading}
            endIcon={<ArrowForward />}
            loadingPosition="end"
            loading={isWithGoogleLoading}
            onClick={onMoveToRegister}
          />
        </FormControl>
        <Grid>
          <AuthFooter />
        </Grid>
      </Grid>
    </motion.div>
  );
}

export default RoleAuth;
