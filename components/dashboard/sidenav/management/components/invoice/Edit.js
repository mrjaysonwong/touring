import Layout from '@components/dashboard/layout/Layout';
import { Typography, Box } from '@mui/material';

export default function EditInvoiceDashboard() {
  return (
    <>
      <Layout>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Edit Invoice
        </Typography>

        <Typography variant="body1">Test Edit</Typography>
      </Layout>
    </>
  );
}
