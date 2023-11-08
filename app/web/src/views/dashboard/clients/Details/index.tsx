import React from "react";
import {
  Typography,
  Grid,
  Paper,
  Avatar,
  Card,
  CardContent,
  Container,
  Box,
  Divider,
} from "@mui/material";

interface DeveloperRoleProps {
  role: string;
  description: string;
}

const DeveloperRole: React.FC<DeveloperRoleProps> = ({ role, description }) => {
  return (
    <Box className="developer-role">
      <Typography variant="h6">{role}</Typography>
      <Typography>{description}</Typography>
    </Box>
  );
};

interface TeamMemberProps {
  name: string;
  role: string;
  profile: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, profile }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        backgroundColor: "#f5f5f5",
        transition: "0.3s",
        "&:hover": {
          backgroundColor: "#ececec",
        },
      }}
      elevation={3}
    >
      <Avatar alt={name} src={profile} />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography>{role}</Typography>
      </CardContent>
    </Card>
  );
};

const ClientDetails: React.FC = () => {
  return (
    <Container>
      <Paper sx={{ padding: 4, maxWidth: 800, margin: "auto" }} elevation={3}>
        <Typography variant="h4">Client Details</Typography>

        <Box>
          <Typography variant="h5">Developer Roles</Typography>
          <Divider />
          <DeveloperRole
            role="Front-end Developer"
            description="Responsible for the client's website's user interface."
          />
        </Box>

        <Box>
          <Typography variant="h5">About the Company</Typography>
          <Divider />
          <Typography>
            Provides a detailed description of the client company, its mission,
            values, and culture.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5">Company Logo</Typography>
          <Divider />
          <Avatar alt="Company Logo" src="company_logo_url" />
        </Box>

        <Box>
          <Typography variant="h5">Team Members</Typography>
          <Divider
            sx={{
              margin: 2,
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TeamMember
                name="John Doe"
                role="CTO"
                profile="team_member_profile_url"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TeamMember
                name="Jane Smith"
                role="Lead Developer"
                profile="team_member_profile_url"
              />
            </Grid>
            {/* Add more team members as needed */}
          </Grid>
        </Box>

        {/* Add more sections as needed */}
      </Paper>
    </Container>
  );
};

export default ClientDetails;
