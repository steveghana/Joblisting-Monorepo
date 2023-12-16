import React, { useEffect } from 'react';
import FullscreenProgress from '../../components/FullscreenProgress/FullscreenProgress';
import NoData from '../../components/NoData';
import { useDevsColums } from '../../hooks/useAllDevsColumn';
import DevTableData from './DevColumns';
import { useGetDevsQuery } from '../../store/services/dev.service';
import MainCard from '../../components/MainCard';
import { Grid } from '@mui/material';

const Developers = () => {
  const columns = useDevsColums();

  const { data: devs, isError, isLoading, isFetching, refetch } = useGetDevsQuery();
  const devsData = (devs?.length && devs?.filter(({ rolestatus }) => rolestatus === 'Accepted')) || [];

  if (isLoading || isFetching) {
    return <FullscreenProgress />;
  }

  if (!devsData.length || isError) {
    return (
      <Grid height={'100%'} sx={{ background: 'white' }}>
        <NoData />
      </Grid>
    );
  }
  console.log(devsData);
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
