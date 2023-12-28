import React, { useState } from 'react';
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
  Card,
  Avatar,
  IconButton,
  Stack,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LockIcon from '@mui/icons-material/Lock';
import LinkIcon from '@mui/icons-material/Link';
import PersonIcon from '@mui/icons-material/Person';
import {
  Close,
  Delete,
  DeleteTwoTone,
  Edit,
  EditCalendar,
  EditTwoTone,
  Mail,
  VerifiedUserTwoTone,
} from '@mui/icons-material';
import { IconUsers } from '@tabler/icons-react';
import ComposeEmail from '.';

interface Event {
  title: string;
  date: string;
  time: string;
  zoomId: string;
  zoomPasscode: string;
  zoomLink: string;
  host: string;
  guests: string[];
}

interface EventDrawerProps {
  event: Event;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const EventDrawer: React.FC<EventDrawerProps> = ({ event, onClose, onEdit, onDelete }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Grid
      sx={{
        background: 'white',
        height: '100%',
        maxWidth: { lg: '27dvw', md: '40dvw' },
        position: 'relative',
      }}
    >
      <ComposeEmail open={dialogOpen} setDialogOpen={() => setDialogOpen(false)} /* event={event} */ />
      <Box sx={{ background: 'white', zIndex: 2, width: '100%' }} position={'absolute'}>
        <Card variant="outlined" sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', gap: 1.5 }}>
          <IconButton onClick={onEdit}>
            <EditTwoTone />
          </IconButton>
          <IconButton>
            <EditCalendar />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteTwoTone />
          </IconButton>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Card>
      </Box>
      <List sx={{ height: '100%', overflowY: 'auto', paddingTop: '3rem' }}>
        <Stack>
          <ListItem sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <EventIcon sx={{ color: '#4285F4' }} />
            <ListItemText primary="Event Title" secondary={event.title} />
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ScheduleIcon sx={{ color: '#34A853' }} />
            <ListItemText primary="Date" secondary={event.date} />
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ScheduleIcon sx={{ color: '#34A853' }} />
            <ListItemText primary="Time" secondary={event.time} />
          </ListItem>
          {/* <ListItem sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <VideoCallIcon sx={{ color: '#FABC05' }} />
            <ListItemText primary="Zoom Meeting ID" secondary={event.zoomId} />
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LockIcon sx={{ color: '#FABC05' }} />
            <ListItemText primary="Zoom Passcode" secondary={event.zoomPasscode} />
          </ListItem> */}
          <ListItem sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LinkIcon sx={{ color: '#4285F4' }} />
            <ListItemText primary="Zoom Link" secondary={event.zoomLink} />
          </ListItem>
          <ListItem>
            <Box>
              <Box display={'flex'} gap={1.5} alignItems={'center'}>
                <IconUsers size={'1rem'} color="grey" /> 2 guests{' '}
                <IconButton onClick={() => setDialogOpen(true)}>
                  <Mail sx={{ ml: 'auto', color: 'gray' }} />
                </IconButton>
              </Box>
              {event.guests.map((guest, index) => (
                <Box pl={3} gap={1} display={'flex'} py={1} alignItems={'center'} key={index}>
                  <Avatar sx={{ bgcolor: '#0F9D58' }}>{guest[0]}</Avatar>
                  <ListItemText key={index} primary={guest} />
                </Box>
              ))}
            </Box>
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PersonIcon sx={{ color: '#0F9D58' }} />
            <ListItemText primary="Host" secondary={event.host} />
          </ListItem>
        </Stack>
      </List>
    </Grid>
  );
};

export default EventDrawer;
