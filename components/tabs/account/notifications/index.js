import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { DataContext } from '@pages/account/profile';
import { LoadSkeleton } from '@components/placeholder/LoadingSkeleton';
import Subscribe from './components/Subscribe';

export default function Notifications() {
  const data = useContext(DataContext);
  const userData = data.session.result;
  return (
    <>
      {/* <LoadSkeleton loading /> */}

      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Notifications
      </Typography>

      <Subscribe />
    </>
  );
}
