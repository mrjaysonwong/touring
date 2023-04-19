import { useContext } from 'react';
import Link from 'next/link';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { generalItems } from '@src/routes/dashboard-routes';
import { SideNavContext } from '@components/dashboard/layout/Layout';

export default function Dashboard() {
  const router = useContext(SideNavContext);

  return (
    <>
      {generalItems.map((item) => (
        <Link key={item.title} href={item.path}>
          <ListItem
            disablePadding
            sx={{ color: router.pathname === item.path ? '#f48638' : '' }}
          >
            <ListItemButton>
              <ListItemIcon
                sx={{ color: router.pathname === item.path ? '#f48638' : '' }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </>
  );
}
