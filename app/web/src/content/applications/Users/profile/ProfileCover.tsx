import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  styled,
} from "@mui/material";

import CssBaseline from "@mui/joy/CssBaseline";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import MyProfile from "../settings/MyProfile";
import { Iuser } from "../../../../types/user";
import { useNavigate } from "react-router";
import ActivityTab from "../settings/ActivityTab";
import SubCard from "../../../../components/SubCard";
import { Mail } from "@mui/icons-material";

const Input = styled("input")({
  display: "none",
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);
const ProfileCover = ({ user }: Iuser) => {
  const navigate = useNavigate();
  return (
    <>
      {/* <Box display="flex">
        <Tooltip arrow placement="top" title="Go back">
          <IconButton
            color="primary"
            onClick={() => navigate(-1)}
            sx={{ p: 2, mr: 2 }}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {user.firstName}
          </Typography>
          <Typography variant="subtitle2">{user.jobtitle}</Typography>
        </Box>
      </Box> */}
      <SubCard>
        <Box display="flex" mb={3}>
          <Tooltip
            arrow
            placement="top"
            onClick={() => navigate(-1)}
            title="Go back"
          >
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Box>
            <Typography variant="h3" component="h3" gutterBottom>
              Profile for {user.firstName}
            </Typography>
            <Typography variant="subtitle2">{user.jobtitle}</Typography>
          </Box>
        </Box>
        <CardCover>
          {/* To Do use the sv tech bg */}
          <CardMedia image={user.coverImg} />
        </CardCover>
        <AvatarWrapper>
          <Avatar variant="rounded" alt={user.firstName} src={user.avatar} />
          <ButtonUploadWrapper>
            <Input
              accept="image/*"
              id="icon-button-file"
              name="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton component="span" color="primary">
                <UploadTwoToneIcon />
              </IconButton>
            </label>
          </ButtonUploadWrapper>
        </AvatarWrapper>
        <Box py={2} pl={2} mb={3}>
          <Typography gutterBottom variant="h4">
            {user.firstName}
          </Typography>
          <Typography variant="subtitle2">{user.description}</Typography>
          <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
            {user.jobtitle} | {user.location}
          </Typography>
          <Box
            display={{ xs: "block", md: "flex" }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Button size="small" sx={{ mx: 1 }} variant="outlined">
                View website
              </Button>
              <IconButton color="primary" sx={{ p: 0.5 }}>
                <MoreHorizTwoToneIcon />
              </IconButton>
            </Box>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              size="small"
              variant="text"
              endIcon={<ArrowForwardTwoToneIcon />}
            >
              See all clients connections
            </Button>
          </Box>
          <Box>
            <Button sx={{ m: 1 }} variant="contained" endIcon={<Mail />}>
              Send Email
            </Button>
          </Box>
          <ActivityTab />
        </Box>
      </SubCard>
    </>
  );
};

export default ProfileCover;
