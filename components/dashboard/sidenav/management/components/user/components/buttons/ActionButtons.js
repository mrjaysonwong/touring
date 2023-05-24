import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ActionButtons() {
  return (
    <>
      <Box sx={{ m: 1, color: '#0288d1' }}>
        <EditIcon />
      </Box>
      <Box sx={{ m: 1, color: '#d32f2f' }}>
        <DeleteIcon />
      </Box>
    </>
  );
}
