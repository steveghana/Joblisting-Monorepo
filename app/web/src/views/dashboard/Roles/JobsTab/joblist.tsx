// JobsList.tsx
import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
}

interface JobsListProps {
  jobs: Job[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  return (
    <Box mt={2}>
      {jobs.map((job) => (
        <Card key={job.id} variant="elevation">
          <CardContent>
            <Typography variant="h5">{job.title}</Typography>
            <Typography>{job.company}</Typography>
            <Typography>{job.location}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default JobsList;
