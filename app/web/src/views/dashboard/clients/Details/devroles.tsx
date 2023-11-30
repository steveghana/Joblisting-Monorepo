import { Container, Typography, Paper, Box } from "@mui/material";
const rolesData = [
  {
    title: "Front-End Developer",
    description:
      "Responsible for creating user interfaces and web applications.",
  },
  {
    title: "Back-End Developer",
    description: "Manages server-side logic and databases.",
  },
];

const DeveloperRoles = () => {
  //   const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Paper>
        <Typography variant="h5">Developer Roles</Typography>
        {rolesData.map((role, index) => (
          <Box key={index}>
            <Typography variant="subtitle1">{role.title}</Typography>
            <Typography variant="body2">{role.description}</Typography>
          </Box>
        ))}
      </Paper>
    </Container>
  );
};

export default DeveloperRoles;
