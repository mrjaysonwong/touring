import { List, ListSubheader } from '@mui/material';
import Dashboard from './Dashboard';

export default function General() {
  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            sx={{ bgcolor: 'transparent' }}
            id="nested-list-subheader"
          >
            GENERAL
          </ListSubheader>
        }
      >
        <Dashboard />
      </List>
    </>
  );
}
