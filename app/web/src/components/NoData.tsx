import { Box, Typography } from "@mui/material";
import NoDAta from "../assets/images/empty-box.png";

const NoData = () => {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <img width={150} height={150} src={NoDAta} alt="nodata" />
      <Typography variant="subtitle1">No data to display</Typography>
    </Box>
  );
};
export default NoData;
