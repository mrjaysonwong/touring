import Layout from '@components/layout/Layout';
import { Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import Content from './components/Content';

export default function WelcomeHeader({ data }) {
  const theme = useTheme();
  const breakpointSm = useMediaQuery(theme.breakpoints.up('sm'));

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
          <Content breakpointSm={breakpointSm} />
        </Container>
      </Layout>
    </>
  );
}
