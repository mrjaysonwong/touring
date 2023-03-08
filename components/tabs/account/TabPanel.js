import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

export default function TabPanel(props) {
  const { children, value, tab } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== tab}
      id={`custom-tabpanel-${tab}`}
      aria-labelledby={`custom-tab-${tab}`}
      sx={{
        width: '100%',
      }}
    >
      {value === tab && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  tab: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
