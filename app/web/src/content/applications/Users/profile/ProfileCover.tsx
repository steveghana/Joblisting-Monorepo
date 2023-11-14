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
} from "@mui/material";

import CssBaseline from "@mui/joy/CssBaseline";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import MyProfile from "../settings/MyProfile";
import { Iuser } from "../../../../types/user";
import { useNavigate } from "react-router";

const ProfileCover = ({ user }: Iuser) => {
  const navigate = useNavigate();
  return (
    <>
      <Box display="flex">
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
      </Box>
    </>
  );
};

export default ProfileCover;
