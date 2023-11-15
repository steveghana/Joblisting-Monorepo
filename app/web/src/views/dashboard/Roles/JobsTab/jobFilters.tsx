// JobFilters.tsx
import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

interface JobFiltersProps {
  filters: Record<string, any>;
  onChange: (newFilters: Record<string, any>) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, onChange }) => {
  const [openStates, setOpenStates] = React.useState([true, true, true]);
  console.log(openStates);
  const handleButtonClick = (index) => {
    setOpenStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onChange({ ...filters, [event.target.name]: event.target.value });
  };

  const handleApplyFilters = () => {
    // Handle applying filters if needed
  };
  return (
    <Grid
      lg={3}
      md={4}
      xs={12}
      // border={"1px solid grey"}
      width={"100%"}
    >
      <Card variant="outlined" sx={{ p: 1 }}>
        <Typography variant="subtitle1">Filter By</Typography>
        {[...Array(3)].map((_, index) => (
          <Box key={index}>
            <Box
              display={"flex"}
              gap={1}
              onClick={() => handleButtonClick(index)}
              alignItems={"center"}
            >
              {openStates[index] ? (
                <ArrowDropUp />
              ) : (
                <ArrowDropDown color="info" />
              )}

              <Typography variant="caption">Team</Typography>
            </Box>
            <Box
              //   my={1}
              px={2}
              gap={2}
              alignItems={"center"}
              sx={{ display: openStates[index] ? "flex" : "none" }}
            >
              <FormControlLabel label="Engineering" control={<Checkbox />} />
              <Typography variant="caption">0</Typography>
            </Box>
          </Box>
        ))}
        <Button variant="outlined" sx={{ my: 1 }} fullWidth>
          <Typography color={"grey"}>Clear all</Typography>
        </Button>
      </Card>
    </Grid>
  );
};

export default JobFilters;
