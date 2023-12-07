import React, { useState } from "react";
import FullscreenProgress from "../../components/FullscreenProgress/FullscreenProgress";
import NoData from "../../components/NoData";
import { useDevsShortlistedColums } from "../../hooks/useShortlistedDevsColumns";
import { useGetDevsQuery } from "../../store/services/dev.service";
import DevTableData from "../Devs/DevColumns";
import InterviewPage from "./interview";
import { useNavigate } from "react-router";

const Shortlisted = () => {
  const columns = useDevsShortlistedColums();
  const {
    data: devs,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetDevsQuery();
  const [openRoleForm, setOpenRoleForm] = React.useState(false);
  const [applicantId, setApplicantID] = useState<string>();
  const handleOpenInterviewForm = (id: string) => {
    setOpenRoleForm(true);
  };
  const handleCloseJobForm = () => {
    setOpenRoleForm(false);
  };
  const navigate = useNavigate();
  const devsShortlistedData =
    (devs?.length &&
      devs.filter(({ rolestatus }) => rolestatus === "Pending")) ||
    [];

  if (isLoading || isFetching) {
    return <FullscreenProgress />;
  }
  if (!devsShortlistedData.length) {
    return <NoData />;
  }
  return (
    <>
      <InterviewPage onClose={handleCloseJobForm} open={openRoleForm} />

      <DevTableData
        handleOpenInterviewForm={(id) => navigate(`/hr/interviews/${id}`)}
        tableType="Shortlist"
        columns={columns}
        devs={devsShortlistedData}
        refetch={() => refetch()}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
      />
    </>
  );
};
export default Shortlisted;
