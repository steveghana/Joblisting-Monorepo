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

const ProfileCover = ({ user }: Iuser) => {
  return (
    <>
      <Box display="flex">
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
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

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired,
};

export default ProfileCover;
