import { useEffect, useContext } from 'react';
import Link from 'next/link';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import { managementItems, tourItems } from '@src/routes/dashboard-routes';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SideNavContext } from '@components/dashboard/Layout';
import { toursStore } from 'stores/dashboard-store';

export default function Tours() {
  const icon = managementItems[0].icon;
  const title = managementItems[0].title;

  const toggle = toursStore((state) => state.toggle);
  const currentpath = toursStore((state) => state.currentpath);
  const setCurrentPath = toursStore((state) => state.handlePath);
  const show = toursStore((state) => state.show);

  const router = useContext(SideNavContext);

  useEffect(() => {
    if (router.asPath !== currentpath) {
      toursStore.setState({ show: false });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ListItemButton onClick={toggle}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={show} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {tourItems.map((item) => (
            <Link key={item.title} href={item.path}>
              <ListItemButton
                key={item.title}
                onClick={() => setCurrentPath(item.path)}
                sx={{ color: router.pathname === item.path ? '#f48638' : '' }}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>
    </>
  );
}
