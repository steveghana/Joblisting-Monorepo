// JobsList.tsx
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ClockIcon } from "@mui/x-date-pickers";
import { IJobs } from "../../../../types";
import { themePalette } from "../../../../themes/schemes/palette";
import Dot from "../../../../components/Dot";
import { FiberManualRecord } from "@mui/icons-material";

interface JobsListProps {
  jobs: IJobs[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  return (
    <Grid lg={7} md={8} sm={12} mt={2}>
      {jobs.map((job) => (
        <Card key={job.id} variant="elevation">
          <CardContent>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>
                <Typography color={"gray"} variant="subtitle1">
                  {job.roleCategory}
                </Typography>
                <Typography color={themePalette.primary.main}>
                  {job.rolename}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"flex-start"}
              >
                <ClockIcon
                  fontSize="small"
                  sx={{ ml: "auto" }}
                  color="disabled"
                />
                {/* use the date */}
                <Typography whiteSpace={"nowrap"} variant="caption">
                  Posted I month ago
                </Typography>
              </Box>
            </Box>
            <Box>
              <List>
                {job.task.map((t) => (
                  <ListItem sx={{ display: "flex" }}>
                    <ListItemIcon>
                      <FiberManualRecord sx={{ fontSize: ".5rem" }} />
                    </ListItemIcon>
                    <ListItemText primary={t} />
                    {/* {t} */}
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box
              my={1}
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
                <Box display={"flex"} alignItems={"center"} gap={0.4}>
                  <Typography>{job.joblocation}</Typography>
                  <Dot />
                  <Typography fontWeight={400} variant="subtitle1">
                    {job.location.country.join(" - ")}
                  </Typography>
                  <Dot />
                  <Typography fontWeight={400} variant="subtitle1">
                    {job.location.continent}
                  </Typography>
                </Box>
                <Typography>{job.salary}</Typography>
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
            {/* <Typography>{job.company}</Typography>
            <Typography>{job.location}</Typography> */}
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
};

export default JobsList;
