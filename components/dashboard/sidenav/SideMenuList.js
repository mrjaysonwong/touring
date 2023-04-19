import { List, ListSubheader, useTheme } from '@mui/material';

export default function SideMenuList(props) {
  const { children, subHeader } = props;
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ bgcolor: isDarkMode ? 'rgb(30,30,30)' : '#fff' }}
        >
          {subHeader}
        </ListSubheader>
      }
    >
      {children}
    </List>
  );
}
