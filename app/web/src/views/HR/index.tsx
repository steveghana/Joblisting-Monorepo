import React, { useEffect, useState } from 'react';
import FullscreenProgress from '../../components/FullscreenProgress/FullscreenProgress';
import NoData from '../../components/NoData';
import { useDevsShortlistedColums } from '../../hooks/useShortlistedDevsColumns';
import { useGetDevsQuery } from '../../store/services/dev.service';
import DevTableData from '../Devs/Tables/DevColumns';
import { useNavigate } from 'react-router';
import { persistor, useTypedDispatch, useTypedSelector } from '../../store';
import { fetchDevs } from '../../store/slices/dev.slice';
import TableSkeletonLoader from '@/components/Skeleton/tableSkeleton';
import { toast } from 'react-toastify';

const Shortlisted = () => {
  // const { devs, error, isError, isFetching, isloading } = useTypedSelector(
  //   (state) => state.devs
  // );
  const { data: devs, error, isError, isFetching, isLoading, refetch } = useGetDevsQuery();
  // State is used as Cache from devs api cannot be invalidated from the interview page
  const [openRoleForm, setOpenRoleForm] = React.useState(false);
  const handleCloseJobForm = () => {
    setOpenRoleForm(false);
  };
  console.log(devs, isError, error, isFetching);
  // const hasInterview = devs.
  const columns = useDevsShortlistedColums();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const devsShortlistedData =
    (devs?.length && devs.filter(({ rolestatus }) => rolestatus === 'Pending' || rolestatus === 'Interviewing')) || [];
  const areGuestsAvailable = devs?.filter(({ rolestatus }) => rolestatus === 'Accepted').length;
  useEffect(() => {
    dispatch(fetchDevs());
    Promise.resolve(persistor.flush());
  }, [dispatch]);
  if (isLoading || isFetching) {
    return <TableSkeletonLoader />;
  }
  if (!devsShortlistedData.length) {
    return <NoData />;
  }
  return (
    <DevTableData
      handleOpenInterviewForm={(id) => {
        if (!areGuestsAvailable) {
          toast.warn('Please add fulltime devs before scheduling interviews with candidates', {
            position: 'bottom-center',
          });
          return;
        }
        navigate(`/hr/interviews/${id}`);
      }}
      tableType="Shortlist"
      columns={columns}
      devs={devsShortlistedData}
      refetch={
        () => refetch() // update the persisted state
      }
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
    />
  );
};
export default Shortlisted;
