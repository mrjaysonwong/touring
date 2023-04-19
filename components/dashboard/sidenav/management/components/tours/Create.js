import Layout from '@components/dashboard/layout/Layout';
import { Typography, Box } from '@mui/material';

export default function CreateTourDashboard() {
  return (
    <>
      <Layout>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Create New Tour
        </Typography>

        <Typography variant="body1">Test Create</Typography>
      </Layout>
    </>
  );
}
