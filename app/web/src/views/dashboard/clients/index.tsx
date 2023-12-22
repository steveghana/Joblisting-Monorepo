import { Avatar, Button, ButtonBase, Divider, Grid, GridTypeMap, Typography } from '@mui/material';
import MainCard from '../../../components/MainCard';
import SubCard from '../../../components/SubCard';
import { Box } from '@mui/system';
import { BlockOutlined, MessageRounded, MoreHoriz } from '@mui/icons-material';
import CustomButton from '../../../components/button';
import { useNavigate } from 'react-router';
import { Protect } from '../../../components/auth/requireAuth';
import ClientTable from './Tables/clientTable';
import { useGetClientsQuery } from '../../../store/services/client.service';
import NoData from '../../../components/NoData';
import FullscreenProgress from '../../../components/FullscreenProgress/FullscreenProgress';
import TableSkeletonLoader from '@/components/Skeleton/tableSkeleton';
/**
 * Clients component displays a list of clients from the API.
 * It fetches the clients data and handles loading/error states.
 * Renders a table of clients if data is available,
 * otherwise shows loading indicator or empty state.
 * Allows navigating to add a new client.
 * Exported as default for use in route definitions.
 */

const Clients = () => {
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isError, refetch } = useGetClientsQuery();

  const renderContent = () => {
    if (isLoading || isFetching) {
      return <TableSkeletonLoader />;
    }

    if (data?.length) {
      return (
        <ClientTable refetch={refetch} data={data} isError={isError} isFetching={isFetching} isLoading={isLoading} />
      );
    }

    return <NoData />;
  };

  return (
    <MainCard title={'Clients'}>
      <CustomButton text="Add new Client" onClick={() => navigate('/dashboard/customers/clients/add')} />

      {renderContent()}
    </MainCard>
  );
};

export default Protect(Clients, ['Ceo']);
