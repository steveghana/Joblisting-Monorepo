import {
  Avatar,
  Button,
  ButtonBase,
  Divider,
  Grid,
  GridTypeMap,
  Typography,
} from "@mui/material";
import MainCard from "../../../components/MainCard";
import SubCard from "../../../components/SubCard";
import { Box } from "@mui/system";
import { BlockOutlined, MessageRounded, MoreHoriz } from "@mui/icons-material";
import CustomButton from "../../../components/button";
import { useNavigate } from "react-router";
import { Protect } from "../../../components/auth/requireAuth";
import ClientTable from "./Details/clientColumns";
import { useGetClientsQuery } from "../../../store/services/client.service";
import NoData from "../../../components/NoData";
import FullscreenProgress from "../../../components/FullscreenProgress/FullscreenProgress";

const Clients = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isError, refetch } =
    useGetClientsQuery();

  if (isLoading || isFetching) {
    return <FullscreenProgress />;
  }
  return (
    <MainCard title={"Clients"}>
      <CustomButton
        text="Add new Client"
        onClick={() => navigate("/dashboard/customers/clients/add")}
      />

      {data?.length ? (
        <ClientTable
          refetch={() => refetch()}
          data={data}
          isError={isError}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      ) : (
        <NoData />
      )}
    </MainCard>
  );
};

const ClientCard = (props) => {
  return (
    <SubCard>
      <Grid container direction="column" spacing={1}>
        <Grid
          className="avatar"
          display={"flex"}
          gap={"1rem"}
          justifyContent={"space-between"}
          item
        >
          <Avatar alt="user" variant="rounded" />

          <ButtonBase>
            <MoreHoriz />
          </ButtonBase>
        </Grid>
        {/* <Divider sx={{ margin: "1rem 0" }} /> */}
        <Grid my={2} className="mail links" item>
          <Box>
            <Typography fontWeight={700} variant="h4" mr={"auto"}>
              Dillion
            </Typography>
            <Typography variant="caption">Fullstack developer</Typography>
          </Box>
          {/* <Divider sx={{ margin: "1rem 0" }} /> */}
          <Box my={2} alignItems={"center"} gap={".4rem"} display={"flex"}>
            <Typography fontWeight={700} variant="caption" mr={"auto"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consectetur nam nulla alias cupiditate molestias, voluptatibus
              consequatur architecto voluptas
            </Typography>
          </Box>
          <Divider sx={{ margin: "1rem 0" }} />

          <Box>
            <Box my={2}>
              <Typography fontWeight={700} variant="h5" mr={"auto"}>
                Email
              </Typography>
              <Typography variant="caption">demo@svtech.com</Typography>
            </Box>
            <Grid my={2} display={"flex"} justifyContent={"space-between"}>
              <Box>
                <Typography fontWeight={700} variant="h5" mr={"auto"}>
                  Phone
                </Typography>
                <Typography variant="caption">+244 444555444</Typography>
              </Box>
              <Box>
                <Typography fontWeight={700} variant="h5" mr={"auto"}>
                  Location
                </Typography>
                <Typography variant="caption">Melbourne</Typography>
              </Box>
            </Grid>
          </Box>
          <Divider sx={{ margin: "1rem 0" }} />
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<MessageRounded />}
            >
              Message
            </Button>
            <Button
              size="small"
              color="error"
              variant="outlined"
              startIcon={<BlockOutlined />}
            >
              Remove
            </Button>
          </Box>
        </Grid>
      </Grid>
    </SubCard>
  );
};

export default Protect(Clients, ["Ceo"]);
