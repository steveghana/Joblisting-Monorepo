import {
  CardActions,
  Link,
  Grid,
  Avatar,
  Chip,
  Divider,
  ButtonBase,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiTypography from "@mui/material/Typography";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";

import MainCard from "../../../../ui-component/cards/MainCard";
import CardSecondaryAction from "../../../../ui-component/cards/CardSecondaryAction";
import { gridSpacing } from "../../../../store/constant";
import SubCard from "../../../../ui-component/cards/SubCard";
import { Email, EmailOutlined, LocationOn, Phone } from "@mui/icons-material";
import { componentThemeoption } from "../../../../themes/schemes/PureLightTheme";
import { Stack, shouldForwardProp } from "@mui/system";
import { IconMail } from "@tabler/icons";

import { Box } from "@mui/system";
import { themePalette } from "../../../../themes/schemes/palette";
import { userDetailsFields } from "./userdata";
import { useState } from "react";
import Text from "../../../../components/Text";
import Label from "../../../../components/Label";
const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(
  ({ theme }) => ({
    ...componentThemeoption.commonAvatar,
    ...componentThemeoption.mediumAvatar,
    background: themePalette.secondary.light,
    color: theme.palette.secondary.dark,
    // "&:hover": {
    //   background: theme.palette.secondary.dark,
    //   color: themePalette.secondary.light,
    // },
  })
);
function ActivityTab() {
  const [isdev, setisdev] = useState(true);
  const devSkills = [
    "React.js",
    ".Net",
    "Sass",
    "Python",
    "Azure",
    "GCP",
    "AWS lambda",
    "Css",
    "Nestjs",
    "Node/Express",
  ];
  return (
    <MainCard>
      <Grid container>
        <Grid item xs={12} sm={12} lg={4} mr={2}>
          <SubCard>
            <Grid container direction="column" spacing={1}>
              <Grid className="avatar" display={"flex"} gap={"1rem"} item>
                <Avatar alt="user" />
                <Grid mr={"auto"}>
                  <MuiTypography variant="h5" fontWeight={700}>
                    JWT User
                  </MuiTypography>
                  <MuiTypography variant="caption" gutterBottom>
                    Ui/Ux designer
                  </MuiTypography>
                </Grid>
                <Chip color="primary" label="Pro" />
              </Grid>
              <Divider sx={{ margin: "1rem 0" }} />
              <Grid className="mail links" item>
                <Box alignItems={"center"} gap={".4rem"} display={"flex"}>
                  <ButtonBase sx={{ borderRadius: "12px" }}>
                    <IconMail stroke={1.5} size="1.3rem" />
                  </ButtonBase>
                  <MuiTypography fontWeight={700} variant="h5" mr={"auto"}>
                    Email
                  </MuiTypography>
                  <MuiTypography variant="caption">
                    demo@svtech.com
                  </MuiTypography>
                </Box>
                <Divider sx={{ margin: "1rem 0" }} />
                <Box alignItems={"center"} gap={".4rem"} display={"flex"}>
                  <ButtonBase sx={{ borderRadius: "12px" }}>
                    <Phone />
                    {/* <IconMail stroke={1.5} size="1.3rem" /> */}
                  </ButtonBase>
                  <MuiTypography fontWeight={700} variant="h5" mr={"auto"}>
                    Phone
                  </MuiTypography>
                  <MuiTypography variant="caption">
                    +233 554566677
                  </MuiTypography>
                </Box>
                <Divider sx={{ margin: "1rem 0" }} />

                <Box alignItems={"center"} gap={".4rem"} display={"flex"}>
                  <ButtonBase sx={{ borderRadius: "12px" }}>
                    {/* <IconMail stroke={1.5} size="1.3rem" /> */}
                    <LocationOn />
                  </ButtonBase>
                  <MuiTypography fontWeight={700} variant="h5" mr={"auto"}>
                    Location
                  </MuiTypography>
                  <MuiTypography variant="caption">Melbourne</MuiTypography>
                </Box>
                <Divider sx={{ margin: "1rem 0" }} />
                <Grid item xs={12}>
                  <Card>
                    <Box
                      p={1.5}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box>
                        <MuiTypography variant="h4" gutterBottom>
                          Account Settings
                        </MuiTypography>
                        <MuiTypography variant="subtitle2">
                          Manage details related to your account
                        </MuiTypography>
                      </Box>
                    </Box>
                    <Divider />
                    <CardContent sx={{ p: 4 }}>
                      <MuiTypography variant="subtitle2">
                        <Grid container spacing={0}>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            textAlign={{ sm: "right" }}
                          >
                            <Box pr={3} pb={2}>
                              Language:
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={8} md={9}>
                            <Text color="black">
                              <b>English (US)</b>
                            </Text>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            textAlign={{ sm: "right" }}
                          >
                            <Box pr={3} pb={2}>
                              Timezone:
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={8} md={9}>
                            <Text color="black">
                              <b>GMT +2</b>
                            </Text>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            textAlign={{ sm: "right" }}
                          >
                            <Box pr={3} pb={2}>
                              Account status:
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={8} md={9}>
                            <Label color="success">
                              <DoneTwoToneIcon fontSize="small" />
                              <b>Active</b>
                            </Label>
                          </Grid>
                        </Grid>
                      </MuiTypography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <Box
                      p={3}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box>
                        <MuiTypography variant="h4" gutterBottom>
                          Email Addresses
                        </MuiTypography>
                        <MuiTypography variant="subtitle2">
                          Manage details related to your associated email
                          addresses
                        </MuiTypography>
                      </Box>
                    </Box>
                    <Divider />
                    <CardContent sx={{ p: 1.4 }}>
                      <MuiTypography variant="subtitle2">
                        <Grid container spacing={0}>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            textAlign={{ sm: "right" }}
                          >
                            <Box pr={3} pb={2}>
                              Email ID:
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={8} md={9}>
                            <Text color="black">
                              <b>example@demo.com</b>
                            </Text>
                            <Box pl={1} component="span">
                              <Label color="success">Primary</Label>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            textAlign={{ sm: "right" }}
                          >
                            <Box pr={3} pb={2}>
                              Email ID:
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={8} md={9}>
                            <Text color="black">
                              <b>demo@example.com</b>
                            </Text>
                          </Grid>
                        </Grid>
                      </MuiTypography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
        <Grid container lg={8} xs={12} spacing={gridSpacing}>
          <Grid item xs={12} sm={12}>
            <SubCard title="About me">
              <Grid direction="column" spacing={1}>
                <Grid item>
                  <MuiTypography variant="subtitle1" gutterBottom>
                    Hello,I’m Anshan Handgun Creative Graphic Designer & User
                    Experience Designer based in Website, I create digital
                    Products a more Beautiful and usable place. Morbid accusant
                    ipsum. Nam nec tellus at.
                  </MuiTypography>
                  <Divider sx={{ margin: "1rem 0" }} />
                </Grid>
                <Grid item>
                  <MuiTypography variant="h5" fontWeight={700}>
                    Personal Details
                  </MuiTypography>
                  <Divider sx={{ margin: "1rem 0" }} />
                  {Object.keys(userDetailsFields).map((field) => (
                    <Grid display={"flex"} my={1.5}>
                      <MuiTypography
                        variant="h5"
                        sx={{ minWidth: "40%" }}
                        fontWeight={700}
                      >
                        {field}
                      </MuiTypography>
                      <Box
                        sx={{ minWidth: "60%" }}
                        marginX={"auto"}
                        display={"flex"}
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}
                      >
                        <MuiTypography textAlign={"left"}>
                          {userDetailsFields[field]}
                        </MuiTypography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
          {isdev && (
            <Grid item xs={12} sm={12}>
              <SubCard title="skills">
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    {devSkills.map((item) => (
                      // <Stack direction="row" spacing={1}>
                      <Chip label={item} sx={{ m: 0.5 }} />
                      // </Stack>
                    ))}
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          )}
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default ActivityTab;
