import { useRouter } from 'next/router';
import { Tabs as MuiTabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import { accountItems } from 'src/routes';
import TabPanel from './TabPanel';
import {
  PersonalInfo,
  LoginInfo,
  PaymentInfo,
  Notifications,
  TravelPreferences,
  SiteSettings,
} from './index';

const a11yProps = (value) => {
  return {
    id: `custom-tab-${value}`,
    'aria-controls': `custom-tabpanel-${value}`,
  };
};

export default function Tabs() {
  const router = useRouter();
  const currentTab = router.query.tab;

  const theme = useTheme();

  const breakpoint = useMediaQuery(theme.breakpoints.up('md'));

  const handleChange = (event, newValue) => {
    router.push(
      {
        pathname: '/account/profile',
        query: { tab: newValue },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <MuiTabs
        orientation={breakpoint ? 'vertical' : 'horizontal'}
        variant="scrollable"
        value={currentTab}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="custom tabs"
        // allowScrollButtonsMobile
        sx={{
          borderRight: `${breakpoint ? 1 : 0}`,
          borderColor: 'divider',
          minWidth: 230,
          maxHeight: '100vh',
        }}
      >
        {accountItems.map((item, index) => (
          <Tab
            key={index}
            label={item.title}
            {...a11yProps(item.value)}
            value={item.value}
            icon={item.icon}
            iconPosition="start"
            sx={{ textTransform: 'initial', color: 'inherit' }}
          />
        ))}
      </MuiTabs>

      {currentTab === 'personal' && (
        <TabPanel value="personal" tab={currentTab}>
          <PersonalInfo />
        </TabPanel>
      )}
      {currentTab === 'login' && (
        <TabPanel value="login" tab={currentTab}>
          <LoginInfo />
        </TabPanel>
      )}
      {currentTab === 'payment' && (
        <TabPanel value="payment" tab={currentTab}>
          <PaymentInfo />
        </TabPanel>
      )}
      {currentTab === 'notifications' && (
        <TabPanel value="notifications" tab={currentTab}>
          <Notifications />
        </TabPanel>
      )}
      {currentTab === 'preferences' && (
        <TabPanel value="preferences" tab={currentTab}>
          <TravelPreferences />
        </TabPanel>
      )}
      {currentTab === 'settings' && (
        <TabPanel value="settings" tab={currentTab}>
          <SiteSettings />
        </TabPanel>
      )}
    </>
  );
}
