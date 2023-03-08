import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import PaymentsIcon from '@mui/icons-material/Payments';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BackpackIcon from '@mui/icons-material/Backpack';
import BackpackOutlinedIcon from '@mui/icons-material/BackpackOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const accountItems = [
    {
      title: 'Personal Information',
      icon: <PersonIcon />,
      iconOutline: <PersonOutlineOutlinedIcon />,
      value: 'personal',
    },
    {
      title: 'Login Information',
      icon: <TouchAppIcon />,
      iconOutline: <TouchAppOutlinedIcon />,
      value: 'login',
    },
    {
      title: 'Payment Method',
      icon: <PaymentsIcon />,
      iconOutline: <PaymentsOutlinedIcon />,
      value: 'payment',
    },
    {
      title: 'Notifications',
      icon: <NotificationsIcon />,
      iconOutline: <NotificationsNoneIcon />,
      value: 'notifications',
    },
    {
      title: 'Travel Preferences',
      icon: <BackpackIcon />,
      iconOutline: <BackpackOutlinedIcon />,
      value: 'preferences',
    },
    {
      title: 'Site Settings',
      icon: <SettingsIcon />,
      iconOutline: <SettingsOutlinedIcon />,
      value: 'settings',
    },
  ];