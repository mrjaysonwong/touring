import { useEffect, useContext } from 'react';
import Link from 'next/link';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import { managementItems, userItems } from '@src/routes/dashboard-routes';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SideNavContext } from '@components/dashboard/layout/Layout';
import { usersStore } from 'stores/dashboard-store';

export default function Users() {
  const icon = managementItems[1].icon;
  const title = managementItems[1].title;
  const path = managementItems[1].path;

  const toggle = usersStore((state) => state.toggle);
  const currentpath = usersStore((state) => state.currentpath);
  const setCurrentPath = usersStore((state) => state.handlePath);
  const show = usersStore((state) => state.show);

  const router = useContext(SideNavContext);
  const basePath = router.pathname.substring(
    0,
    router.pathname.lastIndexOf('/') + 1
  );

  useEffect(() => {
    if (router.asPath !== currentpath) {
      usersStore.setState({ show: false });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ListItemButton onClick={toggle}>
        <ListItemIcon sx={{ color: basePath === path ? '#f48638' : '' }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={title}
          sx={{ color: basePath === path ? '#f48638' : '' }}
        />
        {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={show} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {userItems.map((item) => (
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
