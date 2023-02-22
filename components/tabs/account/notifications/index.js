import Typography from '@mui/material/Typography';
import { LoadSkeleton } from '@components/loaders/skeleton/LoadingSkeleton';
import Subscribe from './components/Subscribe';

export default function Notifications() {
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
