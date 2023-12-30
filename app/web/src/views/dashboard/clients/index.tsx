import { Avatar, Button, ButtonBase, Divider, Grid, GridTypeMap, IconButton, Tooltip, Typography } from '@mui/material';
import MainCard from '../../../components/MainCard';
import SubCard from '../../../components/SubCard';
import { Box } from '@mui/system';
import { ArrowBackTwoTone, BlockOutlined, MessageRounded, MoreHoriz } from '@mui/icons-material';
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
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" onClick={() => navigate(-1)} title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
            <ArrowBackTwoTone />
          </IconButton>
        </Tooltip>
      </Box>
      <CustomButton text="Add new Client" onClick={() => navigate('/dashboard/customers/clients/add')} />

      {renderContent()}
    </MainCard>
  );
};

export default Clients;
// export default Protect(Clients, ['Ceo']);
