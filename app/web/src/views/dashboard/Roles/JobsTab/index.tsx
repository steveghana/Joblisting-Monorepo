// JobsPage.tsx
import React, { useState } from "react";
import JobsList from "./joblist";
import JobFilters from "./jobFilters";
import { Container, Typography } from "@mui/material";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
}

const dummyJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "ABC Inc.",
    location: "City A",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "XYZ Corp.",
    location: "City B",
  },
  // Add more dummy job data as needed
];

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState(dummyJobs);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    // Apply filtering logic here based on newFilters
    const filteredJobs = dummyJobs.filter((job) => {
      // Implement your filtering logic based on newFilters
      return true; // Placeholder logic, adjust as needed
    });
    setJobs(filteredJobs);
  };

  return (
    <Container>
      <Typography variant="h1">Jobs</Typography>
      <JobFilters filters={filters} onChange={handleFilterChange} />
      <JobsList jobs={jobs} />
    </Container>
  );
};

export default JobsPage;
