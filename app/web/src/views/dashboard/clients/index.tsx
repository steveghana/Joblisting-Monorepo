import {
  Avatar,
  Button,
  ButtonBase,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import MainCard from "../../../ui-component/cards/MainCard";
import SubCard from "../../../ui-component/cards/SubCard";
import { Box } from "@mui/system";
import Text from "../../../components/Text";
import {
  BlockOutlined,
  Label,
  MessageRounded,
  MoreHoriz,
} from "@mui/icons-material";

const Clients = () => {
  return (
    <MainCard>
      <Grid container>
        <Grid item xs={12} sm={12} lg={3} mr={2}>
          <SubCard>
            <Grid container direction="column" spacing={1}>
              <Grid
                className="avatar"
                display={"flex"}
                gap={"1rem"}
                justifyContent={"space-between"}
                item
              >
                <Avatar alt="user" />

                <MoreHoriz />
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
                <Box
                  my={2}
                  alignItems={"center"}
                  gap={".4rem"}
                  display={"flex"}
                >
                  <Typography fontWeight={700} variant="caption" mr={"auto"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Consectetur nam nulla alias cupiditate molestias,
                    voluptatibus consequatur architecto voluptas
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
                  <Grid
                    my={2}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
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
                  <Button variant="outlined" startIcon={<MessageRounded />}>
                    Message
                  </Button>
                  <Button
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
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Clients;
