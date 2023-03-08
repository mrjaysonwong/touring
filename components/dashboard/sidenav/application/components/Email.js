import Link from 'next/link';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { appItems } from '@src/routes/dashboard-routes';

export default function Email() {
  const title = appItems[0].title;
  const path = appItems[0].path;
  const icon = appItems[0].icon;
  return (
    <>
      <Link href={path} passHref>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItemButton>
        </ListItem>
      </Link>
    </>
  );
}
