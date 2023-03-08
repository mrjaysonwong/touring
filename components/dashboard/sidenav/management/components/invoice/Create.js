import Layout from '@components/dashboard/Layout';
import { Typography, Box } from '@mui/material';

export default function CreateInvoiceDashboard() {
  return (
    <>
      <Layout>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Create Invoice
        </Typography>

        <Typography variant="body1">Test Create</Typography>
      </Layout>
    </>
  );
}
