import FullscreenProgress from "../../components/FullscreenProgress/FullscreenProgress";
import NoData from "../../components/NoData";
import { useGetDevsQuery } from "../../store/services/DevsService";
import DevTableData from "./DevColumns";

const Developers = () => {
  const {
    data: devs,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetDevsQuery();
  console.log(devs, "develoeprs");
  if (isLoading || isFetching) {
    return <FullscreenProgress />;
  }
  if (!devs.length) {
    return <NoData />;
  }
  return (
    <DevTableData
      devs={devs}
      refetch={() => refetch()}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
    />
  );
};
export default Developers;
