import { Avatar, ButtonBase, Container, Grid, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import SubCard from '../../../../components/SubCard';
import React, { ChangeEvent, useState } from 'react';
import { Box, styled, useTheme } from '@mui/system';
import RoleDetails from '../components/roledetails';
import { Close } from '@mui/icons-material';
import { themePalette } from '@/themes/schemes/palette';
import JobsPage from '../JobsTab';
import { useGetRoleQuery } from '@/store/services/role.service';
import FullscreenProgress from '@/components/FullscreenProgress/FullscreenProgress';
import { IRoleData } from '@/types/roles';
import { IClient } from '@/types/client';
import MainCard from '@/components/MainCard';
import Applicants from '../../Applicants/Tables/applicants';
const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`,
);
type IRoleTabs = {
  role: IRoleData;
  isExternal?: boolean;
};
const RoleTabs = ({ role, isExternal }: IRoleTabs) => {
  const theme = useTheme();

  const isLargerScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [currentTab, setCurrentTab] = React.useState<string>('overview');
  const roleTabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'jobs', label: 'Jobs' },
    { value: 'applicants', label: 'Applicants' },
  ];
  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    //dont propagate to the drawer component
    event.stopPropagation();
    setCurrentTab(value);
  };
  const tabs = isExternal ? roleTabs.filter((tab) => tab.value !== 'applicants') : roleTabs;

  return (
    <Grid
      // container
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      onKeyUp={(e) => e.stopPropagation()}
    >
      <Grid position={'relative'}>
        <SubCard>
          <Container maxWidth="xl">
            <Grid
              // item
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              // spacing={3}
            >
              <Box
                sx={{ width: '100%' }}
                display={'flex'}
                gap={1}
                my={3}
                p={{ lg: 2, md: 1, sm: 0 }}
                alignItems={'center'}
                flexWrap={'wrap'}
              >
                <Avatar sx={{ width: 56, height: 56 }} variant="rounded" src={role?.client!.companyLogo} />
                <Box>
                  <Typography variant="h4">{role?.client!.companyName}</Typography>
                  <Typography>
                    {role!.client!.aboutTheCompany}
                    {/* Makes cloud security simple, contextual and automated for
                    customers */}
                  </Typography>
                </Box>
              </Box>
              <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
                <TabsWrapper
                  onChange={handleTabsChange}
                  value={currentTab}
                  variant="scrollable"
                  scrollButtons="auto"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  {tabs.map((tab) => {
                    // Only render the "People" tab on larger screens
                    if (tab.value === 'people' && !isLargerScreen) {
                      return null;
                    }
                    return <Tab sx={{ fontSize: '.7rem' }} key={tab.value} label={tab.label} value={tab.value} />;
                  })}
                </TabsWrapper>
              </Grid>

              <Grid lg={12}>
                {currentTab === 'overview' && <RoleDetails setCurrentTab={setCurrentTab} role={role as IRoleData} />}
                {currentTab === 'jobs' && (
                  <JobsPage job={role!.jobs} client={role!.client as IClient} roleId={role!.id as string} />
                )}
                {currentTab === 'applicants' && (
                  <MainCard>
                    <Grid container lg={12} overflow={'auto'}>
                      <Applicants roleid={role!.id as string} />
                    </Grid>
                  </MainCard>
                )}
              </Grid>
            </Grid>
          </Container>
        </SubCard>
      </Grid>
    </Grid>
  );
};
export default RoleTabs;