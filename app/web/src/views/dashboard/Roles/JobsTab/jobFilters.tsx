// JobFilters.tsx
import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

interface JobFiltersProps {
  filters: Record<string, any>;
  onChange: (newFilters: Record<string, any>) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, onChange }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onChange({ ...filters, [event.target.name]: event.target.value });
  };

  const handleApplyFilters = () => {
    // Handle applying filters if needed
  };

  return (
    <Box mb={2}>
      <Typography variant="h2">Filters</Typography>
      <TextField
        label="Location"
        name="location"
        value={filters.location || ""}
        // onChange={handleFilterChange}
        variant="outlined"
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default JobFilters;
