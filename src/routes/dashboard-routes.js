import AnalyticsIcon from '@mui/icons-material/Analytics';
import PeopleIcon from '@mui/icons-material/People';
import TourIcon from '@mui/icons-material/Tour';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';

export const generalItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AnalyticsIcon />,
  },
];

export const managementItems = [
  {
    title: 'Tour',
    path: '/dashboard/tour/',
    icon: <TourIcon />,
  },
  {
    title: 'User',
    path: '/dashboard/user/',
    icon: <PeopleIcon />,
  },
  {
    title: 'Invoice',
    path: '/dashboard/invoice/',
    icon: <DescriptionIcon />,
  },
  {
    title: 'Account',
    icon: <ManageAccountsIcon />,
  },
];

export const tourItems = [
  {
    title: 'List',
    path: '/dashboard/tour/list',
  },
  {
    title: 'Create',
    path: '/dashboard/tour/new',
  },
  {
    title: 'Edit',
    path: '/dashboard/tour/tourId/edit',
  },
];

export const userItems = [
  {
    title: 'List',
    path: '/dashboard/user/list',
  },
  {
    title: 'Create',
    path: '/dashboard/user/new',
  },
  {
    title: 'Edit',
    path: '/dashboard/user/userId/edit',
  },
];

export const invoiceItems = [
  {
    title: 'List',
    path: '/dashboard/invoice/list',
  },
  {
    title: 'Create',
    path: '/dashboard/invoice/new',
  },
  {
    title: 'Edit',
    path: '/dashboard/invoice/invoiceId/edit',
  },
];

export const appItems = [
  {
    title: 'Email',
    path: '/dashboard/email',
    icon: <EmailIcon />,
  },
  {
    title: 'Calendar',
    path: '/dashboard/calendar',
    icon: <CalendarMonthIcon />,
  },
];
