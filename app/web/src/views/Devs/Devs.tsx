import React, { useEffect } from "react";
import FullscreenProgress from "../../components/FullscreenProgress/FullscreenProgress";
import NoData from "../../components/NoData";
import { useDevsColums } from "../../hooks/useAllDevsColumn";
import DevTableData from "./DevColumns";
import { useGetDevsQuery } from "../../store/services/DevsService";

const Developers = () => {
  const columns = useDevsColums();

  const {
    data: devs,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useGetDevsQuery();
  const devsData =
    (devs?.length &&
      devs?.filter(({ rolestatus }) => rolestatus !== "Pending")) ||
    [];

  if (isLoading || isFetching) {
    return <FullscreenProgress />;
  }

  if (!devsData.length || isError) {
    return <NoData />;
  }

  return (
    <DevTableData
      columns={columns}
      devs={devsData}
      // You can still use refetch if needed
      refetch={() => refetch()}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
    />
  );
};

export default Developers;
