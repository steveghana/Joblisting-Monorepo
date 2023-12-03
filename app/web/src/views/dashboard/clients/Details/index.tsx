import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import SubCard from "../../../../components/SubCard";
import { Box } from "@mui/system";
import {
  ArrowBackTwoTone,
  Email,
  Facebook,
  LocalActivity,
  Phone,
  Pinterest,
  Title,
  VerifiedUser,
  WhatsApp,
} from "@mui/icons-material";
import { themePalette } from "../../../../themes/schemes/palette";
import ClientDetailsOverview from "./overview";
import { useNavigate, useParams } from "react-router";
import { useGetClientQuery } from "../../../../store/services/ClientServce";
import FullscreenProgress from "../../../../components/FullscreenProgress/FullscreenProgress";
import ClientEmployees from "./clientEmployees";
const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);
type Tabstring = "projects" | "tasks" | "devs";
const ClientDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const isLargerScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [currentTab, setCurrentTab] = React.useState<Tabstring>("projects");
  const { data, isError, isLoading, isFetching, refetch } = useGetClientQuery({
    id,
  });
  const tabs = [
    { value: "projects", label: "Project" },
    { value: "tasks", label: "Tasks" },
    { value: "devs", label: "Developers" },
  ];
  const handleTabsChange = (event: ChangeEvent<{}>, value: Tabstring): void => {
    //dont propagate to the drawer component
    event.stopPropagation();
    setCurrentTab(value);
  };
  if (isLoading || isFetching) {
    return <FullscreenProgress />;
  }
  return (
    <Grid sx={{ background: "white", p: 1 }}>
      <Tooltip arrow placement="top" title="Go back">
        <IconButton
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ p: 2, mr: 2 }}
        >
          <ArrowBackTwoTone />
        </IconButton>
      </Tooltip>
      <SubCard>
        <Grid display={"flex"} mb={3} mt={1}>
          <Box
            borderRight={`1px solid ${themePalette.primary.light}`}
            display={"flex"}
            flexDirection={"column"}
            flexWrap={"wrap"}
            maxWidth={"30%"}
            alignItems={"center"}
            gap={1.5}
            p={1}
          >
            <Avatar
              sx={{ width: 56, height: 56 }}
              src={data.companyLogo || data.avatar}
            />
            <Typography>{data.companyName}</Typography>
            {/* <Typography textAlign={"center"} variant="caption">
             {data.aboutTheCompany}
            </Typography> */}
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Facebook />
              <Pinterest />
              <WhatsApp />
            </Box>
          </Box>
          <Grid display={"flex"} flexDirection={"column"} gap={1} p={1}>
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              justifyContent={"space-between"}
              gap={1}
              alignItems={"center"}
            >
              <Grid display={"flex"} gap={1}>
                <VerifiedUser color="disabled" />
                <Box>
                  <Typography variant="caption">Contact name</Typography>
                  <Typography>{data.name}</Typography>
                </Box>
              </Grid>
              <Grid display={"flex"} gap={1}>
                <VerifiedUser color="disabled" />
                <Box>
                  <Typography variant="caption">Company name</Typography>
                  <Typography>{data.companyName}</Typography>
                </Box>
              </Grid>
              <Grid display={"flex"} gap={1}>
                <Email color="disabled" />
                <Box>
                  <Typography variant="caption">Email Address</Typography>
                  <Typography>{data.email}</Typography>
                </Box>
              </Grid>
              <Grid display={"flex"} gap={1}>
                <Phone color="disabled" />
                <Box>
                  <Typography variant="caption">Phone No.</Typography>
                  <Typography>{data.phoneNumber}</Typography>
                </Box>
              </Grid>
              <Grid display={"flex"} gap={1}>
                <LocalActivity color="disabled" />
                <Box>
                  <Typography variant="caption">Country</Typography>
                  <Typography>{data.country.label}</Typography>
                </Box>
              </Grid>
            </Box>

            <Box p={2}>
              <Typography variant="h6" component="h2" gutterBottom>
                About the Company
              </Typography>
              <Typography variant="subtitle2">
                {data.aboutTheCompany}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </SubCard>
      <Divider sx={{ m: 2 }} />
      <>
        <Grid
          mt={2}
          item
          xs={12}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <TabsWrapper
            onChange={handleTabsChange}
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            {tabs.map((tab) => (
              <Tab
                sx={{ fontSize: ".7rem" }}
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </TabsWrapper>
        </Grid>
        <Grid item xs={12}>
          {currentTab === "projects" && (
            <ClientDetailsOverview
              data={data.roles}
              onActionComplete={() => refetch()}
            />
          )}
          {currentTab === "tasks" && (
            <div>Column for displaying deves with roles</div>
          )}
          {currentTab === "devs" && <ClientEmployees devs={data.developers} />}
        </Grid>
      </>
    </Grid>
  );
};
export default ClientDetails;
