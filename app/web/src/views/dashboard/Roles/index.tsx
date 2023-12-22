import MainCard from '../../../components/MainCard';
import { Grid } from '@mui/material';
import { useGetRolesQuery } from '../../../store/services/role.service';
import NoData from '../../../components/NoData';
import RoleSkeleton from '@/components/Skeleton/roleSkeleton';
import RoleCard from './components/roleCard';

const Roles = () => {
  const { data, isLoading, isFetching, isError } = useGetRolesQuery();

  if (isLoading || isFetching) {
    return <RoleSkeleton />;
  }

  const renderRoles = () => {
    if (!data || !data.length) {
      return <NoData />;
    }

    return (
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2 }}>
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
