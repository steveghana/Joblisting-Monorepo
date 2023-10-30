import React from "react";
import MainCard from "../../../components/MainCard";
import { Button, Card, Grid, Typography } from "@mui/material";
import { roleData } from "./roledata";
import { Box } from "@mui/system";
import { ArrowForward } from "@mui/icons-material";
import Dot from "../../../components/Dot";

const RoleDetails = () => {
  return (
    <Card>
      <Grid container>
        <Grid item display={"flex"} flexDirection={"column"} gap={1}>
          <Typography fontWeight={700} variant="h2">
            {roleData.name}
          </Typography>
          <Typography fontWeight={600} variant="h4">
            {roleData.subName}
          </Typography>
          <Typography variant="body2">{roleData.description}</Typography>
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
            onClick={(e) => e.stopPropagation()}
            variant="text"
            sx={{ color: "grey" }}
            endIcon={<ArrowForward />}
          >
            <Typography variant="caption">view jobs </Typography>
          </Button>
        </Box>
        {roleData.jobs.map((job) => (
          <Box
            my={1}
            alignItems={"flex-start"}
            borderRadius={2}
            p={1}
            border={"2px solid rgba(0, 0, 0, 0.1)"}
            display={"flex"}
            gap={2}
            width={"100%"}
            // flexWrap={"wrap"}
          >
            <Box>
              <Typography fontWeight={700} variant="body2">
                {job.rolename} - <b>{job.jobtype}</b>
              </Typography>
              <Box display={"flex"} alignItems={"center"} gap={0.4}>
                <Typography fontWeight={400} variant="subtitle1">
                  {job.location}
                </Typography>
                <Dot />
                <Typography>{job.joblocation}</Typography>
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
                  size="small"
                  // color=""
                  sx={{
                    background: "black",
                    color: "white",
                    maxHeight: "30px",
                  }}
                  variant="contained"
                >
                  <Typography>Learn</Typography>
                </Button>
              </Grid>
            </Box>
          </Box>
        ))}
      </Grid>
    </Card>
  );
};
export default RoleDetails;
