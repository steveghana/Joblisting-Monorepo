import React from "react";
import { IJobs } from "../../../../../types";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
function JobDetails({ jobs }: { jobs: IJobs[] }) {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <>
      {jobs.map((job, i) => (
        <div key={job.id}>
          <Accordion
            expanded={expanded === `panel${i}`}
            onChange={handleChange(`panel${i}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5" component="h3" gutterBottom>
                {job.roleName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Employment Type: ${job.employmentType}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Job Type: ${job.jobType}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Job Category: ${job.roleCategory}`} />
                </ListItem>

                <ListItem>
                  <ListItemText primary={`When To Start: ${job.whenToStart}`} />
                </ListItem>
              </List>
              <Divider />
              <Typography variant="h6" component="h2" gutterBottom>
                Skills:
              </Typography>
              <List>
                {job.selectedSkills.map((skill, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={skill} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <Typography variant="h6" component="legend" gutterBottom>
                Tasks:
              </Typography>
              <List>
                {job.tasks.map((task, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={task} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </>
  );
}

export default JobDetails;
