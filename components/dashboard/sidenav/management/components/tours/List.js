import Layout from '@components/dashboard/Layout';
import { Typography, Box } from '@mui/material';

export default function TourListDashboard() {
  return (
    <>
      <Layout>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Tour List
        </Typography>

        <Typography variant="body1">Test Tours</Typography>
      </Layout>
    </>
  );
}
