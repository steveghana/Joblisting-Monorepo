// JobsPage.tsx
import React, { useState } from "react";
import JobsList from "./joblist";
import JobFilters from "./jobFilters";
import {
  Avatar,
  Container,
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
// import { roleData } from "./roledata";
import {
  ArrowDropDown,
  ArrowDropUp,
  ArrowForward,
  ExpandMore,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { roleData } from "../roledata";
import RoleSummary from "../roleSummary";
import { IClient } from "../../../../types/client";
import { IJobs } from "../../../../types";
// import RoleSummary from "./roleSummary";
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
}

const JobsPage: React.FC<{ job: IJobs[]; client: IClient }> = (props) => {
  const [jobs, setJobs] = useState<IJobs[]>(props.job);
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleFilterChange = (newFilters: Record<string, any>) => {
    // We are grabbing the first item in the keys since it can only be one
    console.log(newFilters, "this filters");
    let filterkey = Object.keys(newFilters)[1];
    // Applying filtering logic here based on newFilters
    const filteredJobs =
      newFilters[filterkey] === true
        ? props.job.filter((job) => {
            return job.roleCategory === filterkey;
          })
        : props.job;
    setJobs(filteredJobs);
  };
  const categoryByfilter = props.job?.map((item) => {
    //We want to categorise the array by their respective categories
    return {
      [item.roleCategory]: props.job.filter(
        (t) => t.roleCategory === item.roleCategory
      ),
    };
  });
  return (
    <Container>
      <Typography variant="h1">Jobs</Typography>
      <Card>
        <Grid
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          gap={1}
        >
          <Grid>
            <Grid item display={"flex"} flexDirection={"column"} my={2} gap={1}>
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
              flexWrap={"wrap"}
              alignItems={"flex-start"}
              sx={{ width: "100%" }}
            >
              <JobFilters
                filters={categoryByfilter}
                onChange={handleFilterChange}
              />
              <JobsList jobs={jobs} location={props.client.country} />
              {matchUpMd && <RoleSummary />}
            </Box>
          </Grid>{" "}
        </Grid>
      </Card>
    </Container>
  );
};

export default JobsPage;
