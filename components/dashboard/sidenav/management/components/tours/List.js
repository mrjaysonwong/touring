import { useRouter } from 'next/router';
import Layout from '@components/dashboard/layout/Layout';
import { Typography, Box } from '@mui/material';
import NavBreadcrumbs from '@components/dashboard/layout/NavBreadcrumbs';

export default function TourListDashboard() {
  const router = useRouter();
  const pathArray = router.pathname.split('/').filter((x) => x);

  return (
    <>
      <Layout>
        <NavBreadcrumbs pathArray={pathArray} fullPath={router.pathname} />
        <Typography variant="h5" sx={{ mb: 5, mt: 2 }}>
          Tours
        </Typography>

        <Typography variant="body1">Test Tours</Typography>
      </Layout>
    </>
  );
}
