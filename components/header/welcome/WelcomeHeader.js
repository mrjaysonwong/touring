import Layout from '@components/layout/Layout';
import { Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import UserWelcomeHeader from './UserWelcomeHeader';
import AdminWelcomeHeader from './AdminWelcomeHeader';

export default function WelcomeHeader({ data }) {
  const userRole = data.user.role
  const theme = useTheme()
  const breakpointSm = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <>
      <Layout>
        <Container
          sx={{
            my: 15,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Welcome {data.user.name}!
          </Typography>
          <br />
          {userRole === 'admin' ? (
            <AdminWelcomeHeader />
          ) : (
            <UserWelcomeHeader breakpointSm={breakpointSm} />
          )}
        </Container>
      </Layout>
    </>
  );
}
