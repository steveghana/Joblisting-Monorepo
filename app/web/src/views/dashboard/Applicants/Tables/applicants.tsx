import React from 'react';
import ApplicantTable from '.';
import { ApplicantsSubmission } from '@/types/roles';
import MainCard from '@/components/MainCard';
import FullscreenProgress, { TransparentScreeProgress } from '@/components/FullscreenProgress/FullscreenProgress';
import NoData from '@/components/NoData';
import { useGetApplicantsQuery } from '@/store/services/application.service';

const Applicants = ({ roleid }: { roleid: string }) => {
  const { data: applicants, refetch, isError, isLoading, isFetching } = useGetApplicantsQuery({ roleid });
  // if (isLoading || isFetching) {
  //   return <TransparentScreeProgress />;
  // }
  if (!applicants?.length) {
    return <NoData />;
  }
  return (
    <MainCard>
      <ApplicantTable applicants={applicants as ApplicantsSubmission[]} actionFn={() => refetch()} />
    </MainCard>
  );
};

export default Applicants;
