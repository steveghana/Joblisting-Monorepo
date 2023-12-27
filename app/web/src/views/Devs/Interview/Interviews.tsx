import PropTypes from 'prop-types';

// material-ui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Paper, Button, TextField } from '@mui/material';
// project imports
import SubCard from '../../../components/SubCard';
import MainCard from '../../../components/MainCard';
import { useDeletInterviewMutation, useGetInterviewsQuery } from '../../../store/services/interview.service';
import React from 'react';
import NoData from '../../../components/NoData';
import FullscreenProgress from '../../../components/FullscreenProgress/FullscreenProgress';
import { ExpandMore, Settings } from '@mui/icons-material';
import CustomButton from '../../../components/button';
import { ClockIcon } from '@mui/x-date-pickers';
import { toast } from 'react-toastify';
import { useTypedSelector } from '../../../store';
import { useNavigate } from 'react-router';
import AnimateButton from '../../../components/extended/AnimateButton';
import EventSchedulerSkeletonLoader from '@/components/Skeleton/interviewsSkeleton';
import CalenderEvent from '@/components/EmailComposer/calenderevents';

// ===============================|| INTERVIEWS ||=============================== //
const interviewDetails = {
  candidateName: 'John Doe',
  interviewerName: 'Jane Smith',
  interviewDate: '2023-12-15',
  interviewTime: '10:00 AM',
  location: 'Zoom Meeting',
};
const event = {
  title: 'Stephen Williams <> ROSE Framework',
  date: 'Monday, December 18',
  time: '4:00 – 4:20pm',
  zoomId: '82539491456',
  zoomPasscode: 'f9b5xP',
  zoomLink: 'https://us05web.zoom.us/j/82539491456?pwd=5xZ4FAze0pFZb1sIPdlZfSXJqQQ9t7.1',
  host: 'johannes.scharlach@roseframework.io',
  guests: ['johannes.scharlach@roseframework.io', 'stephen boateng'],
};
// Dummy data for comments
const comments = [
  { author: 'Alice', text: 'Great interview!' },
  { author: 'Bob', text: 'Candidate performed well.' },
];
type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Interviews = () => {
  const { data, isError, isLoading, isFetching, refetch } = useGetInterviewsQuery();
  const [deletinterview, { isLoading: isDeleting }] = useDeletInterviewMutation();
  const allDevsAndApplicants = useTypedSelector((state) => state.devs.devs);
  const navigate = useNavigate();
  // Date: {
  //   format(new Date(interviewDetails.interviewDate), "yyyy-MM-dd");
  // }
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  // Assuming the data structure returned by the API has interview details
  //  const interviewDetails = data?.interviewDetails || {};
  const handleDelete = async (id: string) => {
    try {
      const deleted = await deletinterview({
        id,
      }).unwrap();
      console.log(deleted, 'response');
      if (deleted) {
        toast.warn('Interview Canceled', {
          position: 'bottom-center',
        });
        refetch();
        navigate(`/devs/interviews`);
      }
    } catch (error) {
      toast.error('Couldnt cancel interview', {
        position: 'bottom-center',
      });
    }
  };
  console.log(data, 'this is the inerview data');
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };
  if (isLoading) {
    <EventSchedulerSkeletonLoader />;
  }

  console.log(data, 'interviews');
  return (
    <MainCard title="Event Schedular">
      <Grid container>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Interview Details
            </Typography>
          </Grid>
          {!data?.length && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                gap: 1,
                px: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <CustomButton
                text="+ New Event"
                onClick={() => {
                  !allDevsAndApplicants.length
                    ? toast.warn('add devs before scheduling an event', { position: 'top-center' })
                    : navigate('/hr/interviews/create');
                }}
                sx={{ marginLeft: 'auto' }}
              />
              <AnimateButton type="rotate">
                {/* <Settings /> */}
                <img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" alt="" style={{ width: '25px' }} />
              </AnimateButton>
            </Box>
          )}
          {!data?.length ? (
            <NoData />
          ) : (
            <Box>
              <SubCard>
                {data.map((item) => (
                  <Grid container spacing={3} key={item.id}>
                    {/* Header */}

                    <Drawer anchor={'right'} open={state} onClose={toggleDrawer(false)}>
                      <CalenderEvent
                        event={event}
                        onClose={() => setState(false)}
                        onDelete={() => {
                          setState(false);
                          handleDelete(item.id as string);
                        }}
                        onEdit={() => {
                          setState(false);
                          navigate(`/devs/interviews/Edit/${item.id}`);
                        }}
                      />
                    </Drawer>
                    <Grid item xs={12} onClick={(e) => toggleDrawer(true)(e)} sx={{ cursor: 'pointer' }}>
                      <Paper
                        elevation={3}
                        sx={{
                          padding: '20px',
                          display: 'flex',
                          alignItems: 'start',
                        }}
                      >
                        <Box width={'100%'}>
                          <Grid container spacing={2}>
                            <Grid item xs={6} mb={2}>
                              <Typography variant="subtitle1" display={'flex'} alignItems={'center'} gap={1}>
                                Candidate: <Avatar sx={{ width: 23, height: 23 }} src={item.candidate.avatar} />{' '}
                                {item.candidate.firstName} {item.candidate.lastName}
                              </Typography>
                              {item.guests.map((guest) => (
                                <Typography
                                  variant="subtitle1"
                                  display={'flex'}
                                  key={guest.id}
                                  alignItems={'center'}
                                  gap={1}
                                >
                                  Interviewer: <Avatar sx={{ width: 23, height: 23 }} src={guest.avatar} />{' '}
                                  {guest.firstName} {guest.lastName}
                                </Typography>
                              ))}
                              <Typography variant="subtitle1">{/* Date: {item.scheduled_date.getDate()} */}</Typography>
                              <Typography variant="subtitle1" display={'flex'} alignItems={'center'} gap={1}>
                                Time: <ClockIcon color="disabled" fontSize="small" /> {interviewDetails.interviewTime}
                              </Typography>
                              <Typography variant="subtitle1" display={'flex'} alignItems={'center'} gap={1}>
                                Location: {interviewDetails.location}
                              </Typography>
                            </Grid>
                            {/* Additional interview details can be added here */}
                          </Grid>
                          <Divider />
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMore />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography variant="subtitle1" component={'animate'}>
                                Comments
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {comments.map((comment, index) => (
                                <Grid>
                                  <Box key={index} style={{ marginBottom: '10px' }}>
                                    <Typography variant="subtitle1">
                                      <strong>{comment.author}:</strong> {comment.text}
                                    </Typography>
                                  </Box>
                                </Grid>
                              ))}
                              <form>
                                <TextField
                                  label="Your Name"
                                  variant="outlined"
                                  fullWidth
                                  style={{ marginBottom: '10px' }}
                                />
                                <TextField
                                  label="Add a Comment"
                                  variant="outlined"
                                  fullWidth
                                  multiline
                                  rows={3}
                                  style={{ marginBottom: '10px' }}
                                />
                                <CustomButton variant="contained" color="primary" type="submit" text="Add Comment" />
                              </form>
                            </AccordionDetails>
                          </Accordion>
                        </Box>
                        <Tooltip sx={{ mx: 'auto' }} title="Cancel Interview">
                          <IconButton>
                            <Typography color={'blue'} onClick={() => handleDelete(item.id as string)}>
                              Cancel
                            </Typography>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Interveiw">
                          <IconButton>
                            <Typography color={'blue'} onClick={() => navigate(`/devs/interviews/Edit/${item.id}`)}>
                              Edit
                            </Typography>
                          </IconButton>
                        </Tooltip>
                      </Paper>
                    </Grid>
                  </Grid>
                ))}
              </SubCard>
            </Box>
          )}

          {/* <EventDashboard /> */}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Interviews;
