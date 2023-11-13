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
import { Box, GridProps } from "@mui/system";
import { BlockOutlined, MessageRounded, MoreHoriz } from "@mui/icons-material";
import CustomButton from "../../../components/button";
import { useNavigate } from "react-router";
import { Component } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Protect } from "../../../components/auth/requireAuth";
import ExampleWithLocalizationProvider from "./Details/clientForm/Columns";
const Clients = () => {
  const navigate = useNavigate();
  return (
    <MainCard title={"Clients"}>
      <CustomButton
        text="Add new Client"
        onClick={() => navigate("/dashboard/customers/clients/add")}
      />
      <ExampleWithLocalizationProvider />
      {/* <Grid container>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12, lg: 16 }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Grid
              onClick={() => {
                console.log(index);
                navigate(`/dashboard/customers/clients/${index}`);
              }}
              key={index}
              item
              xs={2}
              sm={4}
              md={4}
            >
              <ClientCard />
            </Grid>
          ))}
        </Grid>
      </Grid> */}
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
