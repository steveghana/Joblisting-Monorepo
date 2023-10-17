import {
  CardActions,
  Link,
  Grid,
  Avatar,
  Chip,
  Divider,
  ButtonBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiTypography from "@mui/material/Typography";
import MainCard from "../../../../ui-component/cards/MainCard";
import CardSecondaryAction from "../../../../ui-component/cards/CardSecondaryAction";
import { gridSpacing } from "../../../../store/constant";
import SubCard from "../../../../ui-component/cards/SubCard";
import { Email, EmailOutlined, LocationOn, Phone } from "@mui/icons-material";
import { componentThemeoption } from "../../../../themes/schemes/PureLightTheme";
import { shouldForwardProp } from "@mui/system";
import { IconMail } from "@tabler/icons";

import { Box } from "@mui/system";
import { themePalette } from "../../../../themes/schemes/palette";
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
  return (
    <MainCard>
      <Grid container>
        <Grid item xs={12} sm={4} mr={2}>
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
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
        <Grid container xs={12} sm={8} spacing={gridSpacing}>
          <Grid item xs={12} sm={12}>
            <SubCard title="Sub title">
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <MuiTypography variant="subtitle1" gutterBottom>
                    subtitle1. Lorem ipsum dolor sit connecter adieu siccing
                    eliot. Quos blanditiis tenetur
                  </MuiTypography>
                </Grid>
                <Grid item>
                  <MuiTypography variant="subtitle2" gutterBottom>
                    subtitle2. Lorem ipsum dolor sit connecter adieu siccing
                    eliot. Quos blanditiis tenetur
                  </MuiTypography>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
          <Grid item xs={12} sm={12}>
            <SubCard title="Body">
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <MuiTypography variant="body1" gutterBottom>
                    body1. Lorem ipsum dolor sit connecter adieu siccing eliot.
                    Quos blanditiis tenetur unde suscipit, quam beatae rerum
                    inventore consectetur, neque doloribus, cupiditate numquam
                    dignissimos laborum fugiat deleniti? Eum quasi quidem
                    quibusdam.
                  </MuiTypography>
                </Grid>
                <Grid item>
                  <MuiTypography variant="body2" gutterBottom>
                    body2. Lorem ipsum dolor sit connecter adieu siccing eliot.
                    Quos blanditiis tenetur unde suscipit, quam beatae rerum
                    inventore consectetur, neque doloribus, cupiditate numquam
                    dignissimos laborum fugiat deleniti? Eum quasi quidem
                    quibusdam.
                  </MuiTypography>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
          <Grid item xs={12} sm={12}>
            <SubCard title="Extra">
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <MuiTypography variant="button" display="block" gutterBottom>
                    button text
                  </MuiTypography>
                </Grid>
                <Grid item>
                  <MuiTypography variant="caption" display="block" gutterBottom>
                    caption text
                  </MuiTypography>
                </Grid>
                <Grid item>
                  <MuiTypography
                    variant="overline"
                    display="block"
                    gutterBottom
                  >
                    overline text
                  </MuiTypography>
                </Grid>
                <Grid item>
                  <MuiTypography
                    variant="body2"
                    color="primary"
                    component={Link}
                    href="https://berrydashboard.io"
                    target="_blank"
                    display="block"
                    underline="hover"
                    gutterBottom
                  >
                    https://berrydashboard.io
                  </MuiTypography>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default ActivityTab;
