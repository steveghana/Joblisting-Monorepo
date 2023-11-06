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
  Divider,
  Stack,
  FormLabel,
  FormControl,
  Select,
  CardActions,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import DropZone from "./DropZone";
// import FileUpload from "./FileUpload";
// import CountrySelector from "./CountrySelector";
// import EditorToolbar from "./EditorToolbar";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";

const TextField = styled("input")({
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
      background: ${theme.colors?.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors?.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors?.primary.dark};
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

const ProfileCover = ({ user }) => {
  return (
    <>
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body">Personal info</Typography>
          <Typography variant="body">
            Customize how your profile information will apper to the networks.
          </Typography>
        </Box>
        <Divider />
        <Stack
          direction="row"
          spacing={3}
          sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
        >
          <Stack direction="column" spacing={1}>
            {/* <AspectRatio
              ratio="1"
              maxHeight={200}
              sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
            > */}
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
              srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
              loading="lazy"
              alt=""
            />
            {/* </AspectRatio> */}
            <IconButton
              aria-label="upload new picture"
              variant="outlined"
              color="neutral"
              sx={{
                // bgcolor: "background.body",
                position: "absolute",
                zIndex: 2,
                borderRadius: "50%",
                left: 100,
                top: 170,
                // boxShadow: "sm",
              }}
            >
              <EditRoundedIcon />
            </IconButton>
          </Stack>
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <FormLabel>Name</FormLabel>
              <FormControl
                sx={{
                  display: {
                    sm: "flex-column",
                    md: "flex-row",
                  },
                  gap: 2,
                }}
              >
                {/* placeholder="First name" /> */}
                <TextField placeholder="Last name" sx={{ flexGrow: 1 }} />
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={2}>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <TextField defaultValue="UI Developer" />
              </FormControl>
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Email</FormLabel>
                <TextField
                  type="email"
                  startDecorator={<EmailRoundedIcon />}
                  placeholder="email"
                  defaultValue="siriwatk@test.com"
                  sx={{ flexGrow: 1 }}
                />
              </FormControl>
            </Stack>
            <div>{/* <CountrySelector /> */}</div>
            <div>
              <FormControl sx={{ display: { sm: "contents" } }}>
                <FormLabel>Timezone</FormLabel>
                <Select
                  startDecorator={<AccessTimeFilledRoundedIcon />}
                  defaultValue="1"
                >
                  {/* <Option value="1">
                    Indochina Time (Bangkok){" "}
                    <Typography textColor="text.tertiary" ml={0.5}>
                      — GMT+07:00
                    </Typography>
                  </Option>
                  <Option value="2">
                    Indochina Time (Ho Chi Minh City){" "}
                    <Typography textColor="text.tertiary" ml={0.5}>
                      — GMT+07:00
                    </Typography>
                  </Option> */}
                </Select>
              </FormControl>
            </div>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
        >
          <Stack direction="row" spacing={2}>
            <Stack direction="column" spacing={1}>
              {/* <AspectRatio
                ratio="1"
                maxHeight={108}
                sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
              > */}
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
              />
              {/* </AspectRatio> */}
              <IconButton
                aria-label="upload new picture"
                variant="outlined"
                color="neutral"
                sx={{
                  // bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 85,
                  top: 180,
                  boxShadow: "sm",
                }}
              >
                <EditRoundedIcon />
              </IconButton>
            </Stack>
            <Stack spacing={1} sx={{ flexGrow: 1 }}>
              <FormLabel>Name</FormLabel>
              <FormControl
                sx={{
                  display: {
                    sm: "flex-column",
                    md: "flex-row",
                  },
                  gap: 2,
                }}
              >
                <TextField placeholder="First name" />
                <TextField placeholder="Last name" />
              </FormControl>
            </Stack>
          </Stack>

          <FormControl>
            <FormLabel>Role</FormLabel>
            <TextField defaultValue="UI Developer" />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>Email</FormLabel>
            <TextField
              type="email"
              startDecorator={<EmailRoundedIcon />}
              placeholder="email"
              defaultValue="siriwatk@test.com"
              sx={{ flexGrow: 1 }}
            />
          </FormControl>

          <div>{/* <CountrySelector /> */}</div>
          <div>
            <FormControl sx={{ display: { sm: "contents" } }}>
              <FormLabel>Timezone</FormLabel>
              <Select
                startDecorator={<AccessTimeFilledRoundedIcon />}
                defaultValue="1"
              >
                {/* <Option value="1">
                  Indochina Time (Bangkok){" "}
                  <Typography textColor="text.tertiary" ml={0.5}>
                    — GMT+07:00
                  </Typography>
                </Option>
                <Option value="2">
                  Indochina Time (Ho Chi Minh City){" "}
                  <Typography textColor="text.tertiary" ml={0.5}>
                    — GMT+07:00
                  </Typography>
                </Option> */}
              </Select>
            </FormControl>
          </div>
        </Stack>
        {/* <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}> */}
        <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
          <Button variant="outlined" color="neutral">
            Cancel
          </Button>
          <Button variant="solid">Save</Button>
        </CardActions>
        {/* </CardOverflow> */}
      </Card>
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body">Bio</Typography>
          <Typography variant="body">
            Write a short introduction to be displayed on your profile
          </Typography>
        </Box>
        <Divider />
        <Stack spacing={2} sx={{ my: 1 }}>
          {/* <EditorToolbar /> */}
          <TextField
            minRows={4}
            sx={{ mt: 1.5 }}
            defaultValue="I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
          />
          <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
            275 characters left
          </FormHelperText>
        </Stack>
        {/* <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}> */}
        <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
          <Button variant="outlined" color="neutral">
            Cancel
          </Button>
          <Button variant="solid">Save</Button>
        </CardActions>
        {/* </CardOverflow> */}
      </Card>
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body">Portfolio projects</Typography>
          <Typography variant="body">
            Share a few snippets of your work.
          </Typography>
        </Box>

        <Divider />
        <Stack spacing={2} sx={{ my: 1 }}>
          {/* <DropZone /> */}
          {/* <FileUpload
            icon={<InsertDriveFileRoundedIcon />}
            fileName="Tech design requirements.pdf"
            fileSize="200 kB"
            progress={100}
          />
          <FileUpload
            icon={<VideocamRoundedIcon />}
            fileName="Dashboard prototype recording.mp4"
            fileSize="16 MB"
            progress={40}
          /> */}
        </Stack>
        {/* <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}> */}
        <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
          <Button variant="outlined" color="neutral">
            Cancel
          </Button>
          <Button variant="solid">Save</Button>
        </CardActions>
        {/* </CardOverflow> */}
      </Card>
      {/* <MyProfile /> */}
      {/* <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="subtitle2">{user.jobtitle}</Typography>
        </Box>
      </Box>
      <CardCover>
        <CardMedia image={user.coverImg} />
        <CardCoverAction>
          <TextField accept="image/*" id="change-cover" multiple type="file" />
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              Change cover
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.name} src={user.avatar} />
        <ButtonUploadWrapper>
          <TextField
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
          {user.name}
        </Typography>
        <Typography variant="subtitle2">{user.description}</Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          {user.jobtitle} | {user.location}
        </Typography>
      </Box> */}
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired,
};

export default ProfileCover;
