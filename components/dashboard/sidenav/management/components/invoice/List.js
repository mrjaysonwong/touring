import Layout from '@components/dashboard/Layout';
import { Typography, Box } from '@mui/material';

export default function InvoiceListDashboard() {
  return (
    <>
      <Layout>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Invoice List
        </Typography>

        <Typography variant="body1">Test InvoiceListDashboard</Typography>
      </Layout>
    </>
  );
}
