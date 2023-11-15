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
// import RoleSummary from "./roleSummary";
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
}

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState(roleData.jobs);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    // Apply filtering logic here based on newFilters
    const filteredJobs = roleData.jobs.filter((job) => {
      // Implement your filtering logic based on newFilters
      return true; // Placeholder logic, adjust as needed
    });
    setJobs(filteredJobs);
  };
  console.log(expanded);
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
              <JobFilters filters={filters} onChange={handleFilterChange} />
              <JobsList jobs={jobs} />
              {matchUpMd && <RoleSummary />}
            </Box>
          </Grid>{" "}
        </Grid>
      </Card>
    </Container>
  );
};

export default JobsPage;
