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
  Badge,
  Button,
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
import { getRandomColor } from '@/utils/generateRandomColors';
import AnimateButton from '../extended/AnimateButton';

interface Event {
  guests: {
    name: string;
    email: string;
    avatar: string;
  }[];
  eventType: string;
  eventOption: string;
  description: string;
  eventLInk: string;
  starttime: Date;
  endtime: Date;
  startDate: Date;
  endDate: Date;
  updatedAt?: Date | undefined;
  status: 'Scheduled' | 'Completed' | 'Canceled'; //
}

interface EventDrawerProps {
  event: Event;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const EventDrawer: React.FC<EventDrawerProps> = ({ event, onClose, onEdit, onDelete }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  console.log(event);
  // const guestEmails = event.guests.map(guest => guest.email)
  return (
    <Grid
      sx={{
        background: 'white',
        height: '100%',
        minWidth: { lg: '27dvw', md: '30dvw', xs: '100dvw' },
        position: 'relative',
      }}
    >
      <ComposeEmail
        reciepients={event.guests}
        open={dialogOpen}
        setDialogOpen={() => setDialogOpen(false)} /* event={event} */
      />
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
            <ListItemText primary="Event Title" secondary={event.eventType} />
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <EventIcon sx={{ color: '#4285F4' }} />
            <ListItemText primary="Event Description" secondary={event.description} />
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ScheduleIcon sx={{ color: '#34A853' }} />
            <ListItemText primary="Date" secondary={new Date(event.startDate).toLocaleDateString()} />
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ScheduleIcon sx={{ color: '#34A853' }} />
            <ListItemText primary="startTime" secondary={new Date(event.starttime).toLocaleTimeString()} />
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ScheduleIcon sx={{ color: '#34A853' }} />
            <ListItemText primary="endTime" secondary={new Date(event.endtime).toLocaleTimeString()} />
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
            <ListItemText primary={`${event.eventOption} Link`} />
            <AnimateButton type="scale">
              <Button
                href={'https://meet.google.com/?pli=1'} // Insert actual link
                target="_blank"
                // aria-label={`${key} login button`}
                // onClick={handler}
                // disabled={isLoading}
              >
                {event.eventLInk}
              </Button>
            </AnimateButton>
          </ListItem>
          <ListItem>
            <Box>
              <Box display={'flex'} gap={1.5} alignItems={'center'} width={'100%'} justifyContent={'space-between'}>
                <IconUsers size={'1rem'} color="grey" /> {event.guests.length} guests{' '}
                <IconButton onClick={() => setDialogOpen(true)}>
                  <Mail sx={{ ml: 'auto', color: 'gray' }} />
                </IconButton>
              </Box>
              {event.guests.map((guest, index) => (
                <Box pl={3} gap={1} display={'flex'} py={1} alignItems={'center'} key={index}>
                  <Badge color="warning" overlap="circular" badgeContent=" " variant="dot">
                    <Avatar src={guest.avatar && guest.avatar} sx={{ bgcolor: getRandomColor(), color: 'white' }}>
                      {!guest.avatar && guest.name[0]}
                    </Avatar>
                  </Badge>
                  <ListItemText key={index} primary={guest.name} secondary={guest.email} />
                </Box>
              ))}
            </Box>
          </ListItem>
          {/* <ListItem sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PersonIcon sx={{ color: '#0F9D58' }} />
            <ListItemText primary="Host" secondary={event.host} />
          </ListItem> */}
        </Stack>
      </List>
    </Grid>
  );
};

export default EventDrawer;
