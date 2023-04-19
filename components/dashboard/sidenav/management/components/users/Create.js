import Layout from '@components/dashboard/layout/Layout';
import { Typography, Box } from '@mui/material';

export default function CreateUserDashboard() {
  return (
    <>
      <Layout>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Create New User
        </Typography>

        <Typography variant="body1">Test Create</Typography>
      </Layout>
    </>
  );
}
