import React, { useEffect } from 'react';
import FullscreenProgress from '../../components/FullscreenProgress/FullscreenProgress';
import NoData from '../../components/NoData';
import { useDevsColums } from '../../hooks/useAllDevsColumn';
import { useGetDevsQuery } from '../../store/services/dev.service';
import MainCard from '../../components/MainCard';
import { Grid } from '@mui/material';
import TableSkeletonLoader from '@/components/Skeleton/tableSkeleton';
import CustomButton from '@/components/button';
import AddDevs from './Form/addDevs';
import DevTableData from './Tables/DevColumns';

const Developers = () => {
  const columns = useDevsColums();
  const [open, setOpen] = React.useState(false);

  const { data: devs, isError, isLoading, isFetching, refetch } = useGetDevsQuery();
  const devsData =
    (devs?.length && devs?.filter(({ rolestatus }) => rolestatus === 'Accepted' || rolestatus === 'External')) || [];

  if (isLoading || isFetching) {
    return <TableSkeletonLoader />;
  }
  console.log(devs);
  return (
    <MainCard>
      <AddDevs open={open} onClose={() => setOpen(false)} />
      {!devsData.length || isError ? (
        <>
          <CustomButton text="Add new Dev" onClick={() => setOpen(true)} />
          <NoData />
        </>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DevTableData
              devs={devsData}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
              columns={columns}
              refetch={refetch}
            />
          </Grid>
        </Grid>
      )}
      {/* <DevTableData
        columns={columns}
        devs={devsData}
        // You can still use refetch if needed
        refetch={() => refetch()}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
      /> */}
    </MainCard>
  );
};

export default Developers;
