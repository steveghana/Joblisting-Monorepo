import MainCard from '../../../components/MainCard';
import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import { useGetRolesQuery } from '../../../store/services/role.service';
import NoData from '../../../components/NoData';
import RoleSkeleton from '@/components/Skeleton/roleSkeleton';
import RoleCard from './components/roleCard';
import { ArrowBackTwoTone } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const Roles = () => {
  const { data, isLoading, isFetching, isError } = useGetRolesQuery();
  const navigate = useNavigate();

  if (!data || !data.length) {
    return <NoData />;
  }
  if (isLoading || isFetching) {
    return <RoleSkeleton />;
  }
  const renderRoles = () => {
    return (
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2 }}>
        <Box display="flex" mb={3} px={2}>
          <Tooltip arrow placement="top" onClick={() => navigate(-1)} title="Go back">
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoTone />
            </IconButton>
          </Tooltip>
        </Box>
        {data.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </Grid>
    );
  };

  return (
    <MainCard title={'Roles'}>
      <Grid container>{renderRoles()}</Grid>
    </MainCard>
  );
};

export default Roles;
