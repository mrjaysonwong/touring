import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { managementItems } from '@src/routes/dashboard-routes';

export default function Account() {
  return (
    <>
      <ListItemButton>
        <ListItemIcon>{managementItems[3].icon}</ListItemIcon>
        <ListItemText primary={managementItems[3].title} />
      </ListItemButton>
    </>
  );
}
