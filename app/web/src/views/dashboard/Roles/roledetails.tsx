import React from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Card,
  Chip,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { roleData } from "./roledata";
import { ArrowForward } from "@mui/icons-material";
import Dot from "../../../components/Dot";
import SubCard from "../../../components/SubCard";
import { themePalette } from "../../../themes/schemes/palette";
import { IClient } from "../../../types/client";
interface IRoleDetails {
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  client: IClient;
}
const RoleDetails = ({ client, setCurrentTab }: IRoleDetails) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Card>
      <Grid
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        gap={1}
      >
        <Grid lg={8} md={6} sm={12}>
          <Grid item display={"flex"} flexDirection={"column"} my={2} gap={1}>
            <Typography fontWeight={700} variant="h2">
              {client.companyName}
            </Typography>
            <Typography fontWeight={600} variant="h4">
              {client.aboutTheCompany}
            </Typography>
            <Typography variant="body2">{client.projectTitle}</Typography>
          </Grid>
          <Box
            my={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            <Typography variant="h4">Jobs</Typography>
            <Button
              onClick={(e) => setCurrentTab("jobs")}
              variant="text"
              sx={{ color: "grey" }}
              endIcon={<ArrowForward />}
            >
              <Typography variant="caption">view jobs </Typography>
            </Button>
          </Box>
          {client.roles.map((job, i) => (
            <Box
              my={1}
              key={job?.client.name}
              alignItems={"flex-start"}
              borderRadius={2}
              p={1}
              border={"2px solid rgba(0, 0, 0, 0.1)"}
              display={"flex"}
              flexWrap={"wrap"}
              gap={2}
              width={"100%"}
              // flexWrap={"wrap"}
            >
              <Box>
                <Typography
                  color={themePalette.primary.main}
                  fontWeight={700}
                  variant="body2"
                >
                  {job.hiringRole} - <b>{job.employmentType}</b>
                </Typography>
                <Box display={"flex"} alignItems={"center"} gap={0.4}>
                  {/* <Typography fontWeight={400} variant="subtitle1">
                    {job.location.continent}
                  </Typography> */}
                  <Typography fontWeight={400} variant="subtitle1">
                    {client.country.label}
                  </Typography>
                  <Dot />
                  <Typography>{job.roleType}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  ml: { md: 0, lg: "auto" },
                  flexDirection: { sm: "column", md: "row" },
                  justifyContent: { sm: "flex-end", md: "flex-start" },
                }}
                display={"flex"}
                justifyContent={"flex-start"}
                flexWrap={"wrap"}
                alignItems={"center"}
                //   flexDirection={props.feature ? "column" : "row"}
                gap={1}
              >
                <Typography>Posted 4 weeks ago</Typography>
                <Grid display={"flex"} justifyContent={"center"} gap={0.5}>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      color: "black",
                      borderColor: "black",
                      maxHeight: "30px",
                    }}
                  >
                    <Typography variant="caption">save</Typography>
                  </Button>
                  <Button
                    href="/job-submttion"
                    // onClick={() => navigate("job-submttion")}
                    fullWidth
                    sx={{
                      color: "white",
                      maxHeight: "30px",
                    }}
                    variant="contained"
                  >
                    <Typography>apply</Typography>
                  </Button>
                </Grid>
              </Box>
            </Box>
          ))}
          <Typography my={2} variant="h5">
            Founders
          </Typography>
          <Grid lg={4}>
            <SubCard>
              <Grid
                display={"flex"}
                gap={1}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Avatar
                  alt="Founder"
                  src={client.avatar || client.companyLogo}
                />
                <Box>
                  <Typography mt={2}>
                    Founder at {client.companyName}
                  </Typography>
                  <Typography fontWeight={700}>{client.name}</Typography>
                </Box>
              </Grid>
            </SubCard>
          </Grid>
        </Grid>{" "}
        {matchUpMd && (
          <Grid lg={2} md={12} sm={12}>
            <SubCard>
              <Grid container direction="column" spacing={1}>
                <Grid className="avatar" display={"flex"} gap={"1rem"} item>
                  <Typography variant="h5" color={"grey"} fontWeight={700}>
                    About role
                  </Typography>
                </Grid>
                <Divider sx={{ margin: "1rem 0" }} />
                <Grid className="mail links" item>
                  <Box>
                    <ButtonBase sx={{ borderRadius: "12px" }}></ButtonBase>
                    <Typography fontWeight={500} variant="h5" mr={"auto"}>
                      Website
                    </Typography>
                    <Typography variant="caption">demo@svtech.com</Typography>
                  </Box>
                  <Divider sx={{ margin: "1rem 0" }} />
                  <Box gap={1}>
                    <Typography fontWeight={500} variant="h5" mr={"auto"}>
                      Phone
                    </Typography>
                    <Typography variant="caption">
                      {client.phoneNumber}
                    </Typography>
                  </Box>
                  <Divider sx={{ margin: "1rem 0" }} />

                  <Box>
                    <Typography fontWeight={500} variant="h5" mr={"auto"}>
                      Location
                    </Typography>
                    <Typography variant="caption">
                      {client.country.label}
                    </Typography>
                  </Box>
                  <Divider sx={{ margin: "1rem 0" }} />
                  <Box>
                    <Typography fontWeight={500} variant="h5" mr={"auto"}>
                      Industry
                    </Typography>
                    {client.industry.map((item, i) => (
                      <Typography key={i} variant="caption">
                        <Chip label={item} />
                      </Typography>
                    ))}
                  </Box>
                  <Divider sx={{ margin: "1rem 0" }} />
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};
export default RoleDetails;
