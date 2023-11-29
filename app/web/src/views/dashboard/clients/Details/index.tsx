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

const ClientDetailsPage: React.FC<{ data: /* FormDataState */ any }> = ({
  data,
}) => {
  const paperStyle: React.CSSProperties = {
    padding: "16px",
    marginBottom: "16px",
  };

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ marginBottom: "16px" }}>
        Client Details
      </Typography>

      {/* Client Info */}
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h5" gutterBottom>
          Client Information
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">
              <strong>Name:</strong> {data["Client Info"].name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">
              <strong>Email:</strong> {data["Client Info"].email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">
              <strong>Phone Number:</strong> {data["Client Info"].phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">
              <strong>Company Name:</strong> {data["Client Info"].companyName}
            </Typography>
          </Grid>
          {/* Add other fields as needed */}
        </Grid>
      </Paper>

      {/* Project Details */}
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h5" gutterBottom>
          Project Details
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          {/* Add fields from Project Details */}
        </Grid>
      </Paper>

      {/* Additional Data */}
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h5" gutterBottom>
          Additional Data
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          {/* Add fields from Additional Data */}
        </Grid>
      </Paper>

      {/* Communication Type */}
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h5" gutterBottom>
          Communication Type
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          {/* Add fields from Communication Type */}
        </Grid>
      </Paper>
    </Container>
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
