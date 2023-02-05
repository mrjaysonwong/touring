/* Navigation Icons */
import HomeIcon from '@mui/icons-material/Home';
import TourIcon from '@mui/icons-material/Tour';
import InfoIcon from '@mui/icons-material/Info';

/* Account Icons */
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import PaymentIcon from '@mui/icons-material/Payment';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const navItems = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    title: 'Tours',
    path: '/tours',
    icon: <TourIcon />,
  },
  {
    title: 'Company Info',
    path: '/about',
    icon: <InfoIcon />,
  },
];

export const accountItems = [
  {
    title: 'Personal Information',
    icon: <PersonOutlineOutlinedIcon />,
    value: 'personal'
  },
  {
    title: 'Login Information',
    icon: <TouchAppOutlinedIcon />,
    value: 'login'
  },
  {
    title: 'Payment Method',
    icon: <PaymentIcon />,
    value: 'payment'
  },
  {
    title: 'Notifications',
    icon: <NotificationsNoneIcon />,
    value: 'notifications'
  },
  {
    title: 'Travel Preferences',
    icon: <TravelExploreIcon />,
    value: 'preferences'
  },
  {
    title: 'Site Settings',
    icon: <SettingsOutlinedIcon />,
    value: 'settings'
  },
];
