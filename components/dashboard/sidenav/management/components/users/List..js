import { useEffect, useContext } from 'react';
import Layout from '@components/dashboard/Layout';
import { Typography, Box } from '@mui/material';

export default function UserListDashBoard() {
  return (
    <>
      <Layout>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Users
        </Typography>

        <Typography variant="body1">Test Users List</Typography>
      </Layout>
    </>
  );
}
