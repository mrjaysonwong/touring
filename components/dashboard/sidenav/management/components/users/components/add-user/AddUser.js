import { Button } from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

const StyledButton = styled(Button)({
  backgroundColor: 'var(--secondaryColor)',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(221, 92, 0, 0.9) !important',
  },
});

export default function AddUser() {
  return (
    <>
      <StyledButton startIcon={<AddIcon />} variant="contained">
        Add User
      </StyledButton>
    </>
  );
}
