import Link from 'next/link';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { appItems } from '@src/routes/dashboard-routes';

export default function Calendar() {
    const title = appItems[1].title;
    const path = appItems[1].path;
    const icon = appItems[1].icon;
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
  
