
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TourIcon from '@mui/icons-material/Tour';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const navItems = [
    {
      title: 'Home',
      path: '/',
      icon: <HomeIcon />,
      iconOutline: <HomeOutlinedIcon />
    },
    {
      title: 'Tours',
      path: '/tours',
      icon: <TourIcon />,
      iconOutline: <TourOutlinedIcon />
    },
    {
      title: 'Company Info',
      path: '/about',
      icon: <InfoIcon />,
      iconOutline: <InfoOutlinedIcon />
    },
  ];