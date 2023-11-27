import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import DropZone from "./DropZone";
import FileUpload from "./FileUpload";
import CountrySelector from "./CountrySelector";
import EditorToolbar, { LargeTextField } from "./EditorToolbar";

import { Iuser } from "../../types/user";
import { useMediaQuery, useTheme } from "@mui/material";
import { themeTypography } from "../../themes/schemes/typography";
import { Formik } from "formik";
import { Accessibility } from "@mui/icons-material";
import Avatar from "../extended/Avatar";
export default function MyProfile(...others) {
  const theme = useTheme();
  const experience = [3, 4, 5, 6, 7];

  const md = useMediaQuery(theme.breakpoints.down("sm"));
  // const tab = useMediaQuery(theme.breakpoints.only("md"));

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
      }}
    >
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          // maxWidth: "800px",
          mx: "auto",
        }}
      >
        <Formik
          initialValues={{
            email: "",
            url: "",
            bio: "",
            phone: "",
            location: "",
            firstName: "",
            experience: "",
            lastName: "",
            submit: null,
          }}
          onSubmit={async (values, setters) => {
            console.log(values, "from submitting");
            // await register(values, setters, scriptedRef);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit} {...others}>
              <Card>
                <Box sx={{ mb: 1 }}>
                  <Typography level="title-md">Personal info</Typography>
                  <Typography level="body-sm">
                    Customize how your profile information will apper to the
                    networks.
                  </Typography>
                </Box>
                <Divider />

                <Stack
                  direction={md ? "column" : "row"}
                  spacing={2.5}
                  sx={{ my: 1 }}
                >
                  <Stack direction={md ? "row" : "column"} spacing={1}>
                    {/* <Avatar size="xl">
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                        srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                        loading="lazy"
                        alt=""
                      />
                    </Avatar> */}
                    <AspectRatio
                      ratio="1"
                      maxHeight={md ? 260 : 200}
                      sx={{
                        flex: 1,
                        minWidth: md ? 58 : 120,
                        borderRadius: "100%",
                      }}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                        srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                        loading="lazy"
                        alt=""
                      />
                    </AspectRatio>
                    <IconButton
                      aria-label="upload new picture"
                      size="sm"
                      variant="outlined"
                      color="neutral"
                      sx={{
                        bgcolor: "background.body",
                        position: "absolute",
                        zIndex: 2,
                        borderRadius: "50%",
                        left: 90,
                        top: 175,
                        boxShadow: "sm",
                      }}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                  </Stack>
                  <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Stack spacing={1}>
                      <FormLabel>FirstName</FormLabel>
                      <FormControl
                        sx={{
                          // display: "flex",
                          // flexWrap: "wrap",
                          gap: 2,
                        }}
                      >
                        <Input
                          placeholder="First Name"
                          value={values.firstName}
                          name="firstName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          defaultValue=""
                        />
                        <FormLabel htmlFor="outlined-adornment-email-register">
                          LastName
                        </FormLabel>
                        <Input
                          placeholder="Last Name"
                          value={values.lastName}
                          name="lastName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          defaultValue=""
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="outlined-adornment-email-register">
                          Github / LinkedIn
                        </FormLabel>
                        <Input
                          type="url"
                          value={values.url}
                          placeholder="URL"
                          name="url"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Stack>
                    <Stack direction="column" spacing={2}>
                      <FormControl>
                        <FormLabel>Role</FormLabel>
                        <Input size="sm" defaultValue="UI Developer" />
                      </FormControl>
                      <FormControl
                        // error={Boolean(touched.email && errors.email)}
                        sx={{ flexGrow: 1 }}
                      >
                        <FormLabel>Email</FormLabel>
                        <Input
                          placeholder="email"
                          value={values.lastName}
                          name="lastName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="email"
                          defaultValue="siriwatk@test.com"
                          // sx={{ ...themeTypography.customInput, flexGrow: 1 }}
                          size="sm"
                          startDecorator={<EmailRoundedIcon />}
                        />
                        {touched.email && errors.email && (
                          <FormHelperText>{errors.email}</FormHelperText>
                        )}
                      </FormControl>

                      <FormLabel>Years of experience</FormLabel>
                      <Select
                        size="sm"
                        startDecorator={<Accessibility />}
                        defaultValue="1"
                      >
                        {experience.map((item) => (
                          <Option key={item} value={`${item}`}>
                            <Typography textColor="text.tertiary" ml={0.5}>
                              {item}
                            </Typography>
                          </Option>
                        ))}
                      </Select>
                    </Stack>
                    <div>
                      <CountrySelector />
                    </div>
                    <div>
                      <FormControl sx={{ display: { sm: "contents" } }}>
                        <FormLabel>Timezone</FormLabel>
                        <Select
                          size="sm"
                          startDecorator={<AccessTimeFilledRoundedIcon />}
                          // defaultValue="1"
                        >
                          <Option value={"1"}>
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
                          </Option>
                        </Select>
                      </FormControl>
                    </div>
                  </Stack>
                </Stack>
              </Card>
              <Card sx={{ my: 1 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography level="title-md">Bio</Typography>
                  <Typography level="body-sm">
                    Write a short introduction to be displayed on your profile
                  </Typography>
                </Box>
                <Divider />
                <Stack spacing={2} sx={{ my: 1 }}>
                  <LargeTextField />
                </Stack>
                <CardOverflow
                  sx={{ borderTop: "1px solid", borderColor: "divider" }}
                >
                  <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                    <Button size="sm" variant="outlined" color="neutral">
                      Cancel
                    </Button>
                    <Button size="sm" variant="solid">
                      Save
                    </Button>
                  </CardActions>
                </CardOverflow>
              </Card>
              <Card>
                <Box sx={{ mb: 1 }}>
                  <Typography level="title-md">Portfolio projects</Typography>
                  <Typography level="body-sm">
                    Share a few snippets of your work.
                  </Typography>
                </Box>

                <Divider />
                <Stack spacing={2} sx={{ my: 1 }}>
                  <DropZone />
                  <FileUpload
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
                  />
                </Stack>
                <CardOverflow
                  sx={{ borderTop: "1px solid", borderColor: "divider" }}
                >
                  <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                    <Button size="sm" variant="outlined" color="neutral">
                      Cancel
                    </Button>
                    <Button size="sm" variant="solid">
                      Save
                    </Button>
                  </CardActions>
                </CardOverflow>
              </Card>
            </form>
          )}
        </Formik>
      </Stack>
    </Box>
  );
}
