import React, { useEffect } from 'react';
import FullscreenProgress from '../../components/FullscreenProgress/FullscreenProgress';
import NoData from '../../components/NoData';
import { useDevsColums } from '../../hooks/useAllDevsColumn';
import DevTableData from './Tables/DevColumns';
import { useGetDevsQuery } from '../../store/services/dev.service';
import MainCard from '../../components/MainCard';
import { Grid } from '@mui/material';
import TableSkeletonLoader from '@/components/Skeleton/tableSkeleton';

const Developers = () => {
  const columns = useDevsColums();

  const { data: devs, isError, isLoading, isFetching, refetch } = useGetDevsQuery();
  const devsData = (devs?.length && devs?.filter(({ rolestatus }) => rolestatus === 'Accepted')) || [];

  if (isLoading || isFetching) {
    return <TableSkeletonLoader />;
  }

  if (!devsData.length || isError) {
    return <NoData />;
  }
  return (
    <MainCard>
      <DevTableData
        columns={columns}
        devs={devsData}
        // You can still use refetch if needed
        refetch={() => refetch()}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
      />
    </MainCard>
  );
};

export default Developers;
