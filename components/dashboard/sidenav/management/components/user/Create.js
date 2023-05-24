import { useRouter } from 'next/router';
import Layout from '@components/dashboard/layout/Layout';
import { Typography, Box } from '@mui/material';
import NavBreadcrumbs from '@components/dashboard/layout/NavBreadcrumbs';
import AddUserForm from './components/form/AddUserForm';

export default function CreateUserDashboard() {
  const router = useRouter();
  const pathArray = router.pathname.split('/').filter((path) => path);

  return (
    <Layout>
      <NavBreadcrumbs pathArray={pathArray} fullPath={router.pathname} />
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Create a new user
        </Typography>
      </Box>

      <AddUserForm />
    </Layout>
  );
}
