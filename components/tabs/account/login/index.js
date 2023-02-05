import Typography from '@mui/material/Typography';
import Password from './components/Password';
import Provider from './components/Provider';
import Deactivate from './components/Deactivate';

export default function LoginInfo() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Login Information
      </Typography>

      <Password />
      <Provider />
      <Deactivate />
    </>
  );
}
