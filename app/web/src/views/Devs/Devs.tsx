import React from "react";
import FullscreenProgress from "../../components/FullscreenProgress/FullscreenProgress";
import NoData from "../../components/NoData";
import { useDevsColums } from "../../hooks/useAllDevsColumn";
import { useGetDevsQuery } from "../../store/services/DevsService";
import DevTableData from "./DevColumns";

const Developers = () => {
  const columns = useDevsColums();
  const {
    data: devs,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetDevsQuery();

  const devsData =
    devs.filter(({ rolestatus }) => rolestatus !== "Pending") || [];
  if (isLoading || isFetching) {
    return <FullscreenProgress />;
  }
  if (!devsData.length) {
    return <NoData />;
  }

  return (
    <DevTableData
      columns={columns}
      devs={devsData}
      refetch={() => refetch()}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
    />
  );
};
export default Developers;
