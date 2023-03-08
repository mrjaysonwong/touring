import { List, ListSubheader } from '@mui/material';
import Email from './components/Email';
import Calendar from './components/Calendar';

export default function Application() {
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
            APPLICATION
          </ListSubheader>
        }
      >
        <Email />
        <Calendar />
      </List>
    </>
  );
}
