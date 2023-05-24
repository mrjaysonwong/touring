import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { userStore } from 'stores/dashboard-store';

const StyledButton = styled(Button)({
  backgroundColor: 'var(--secondaryColor)',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(221, 92, 0, 0.9) !important',
  },
});

export default function AddUser() {
  const router = useRouter();
  const path = '/dashboard/user/new';
  const { setCurrentPath } = userStore();

  const handleClick = () => {
    router.push(path), setCurrentPath(path);
  };

  return (
    <>
      <StyledButton
        onClick={handleClick}
        startIcon={<AddIcon />}
        variant="contained"
      >
        Add User
      </StyledButton>
    </>
  );
}
