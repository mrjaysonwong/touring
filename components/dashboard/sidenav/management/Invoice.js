import { useEffect, useContext } from 'react';
import Link from 'next/link';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import { managementItems, invoiceItems } from '@src/routes/dashboard-routes';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SideNavContext } from '@components/dashboard/Layout';
import { invoiceStore } from 'stores/dashboard-store';

export default function Invoice() {
  const icon = managementItems[2].icon;
  const title = managementItems[2].title;

  const toggle = invoiceStore((state) => state.toggle);
  const currentpath = invoiceStore((state) => state.currentpath);
  const setCurrentPath = invoiceStore((state) => state.handlePath);
  const show = invoiceStore((state) => state.show);

  const router = useContext(SideNavContext);

  useEffect(() => {
    if (router.asPath !== currentpath) {
      invoiceStore.setState({ show: false });
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
          {invoiceItems.map((item) => (
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
