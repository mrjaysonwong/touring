import { List, ListSubheader } from '@mui/material';
import Tours from './Tours';
import Users from './Users';
import Invoice from './Invoice';
import Account from './Account';

export default function Management() {
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
            MANAGEMENT
          </ListSubheader>
        }
      >
        <Tours />
        <Users />
        <Invoice />
        <Account />
      </List>
    </>
  );
}
