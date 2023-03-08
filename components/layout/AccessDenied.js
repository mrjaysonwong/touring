import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Typography, Button } from '@mui/material';

export default function Accessdenied() {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Box>
          <Image
            src="https://res.cloudinary.com/dc6ae5jse/image/upload/v1677146280/undraw_security_re_a2rk_tt9kkz.svg"
            width={240}
            height={240}
            alt="Protected Page"
            priority
            quality={90}
          />
          <Typography variant="h3" sx={{ fontWeight: 500 }}>
            Access Denied
          </Typography>
          <Typography variant="body1">
            Only admin users can access this page.
          </Typography>
          <br />
          <Link href="/">
            <Button variant="contained">Go to homepage</Button>
          </Link>
          <br />
          <br />
          For admin test.
          <br />
          <Typography variant="body1">
            Email: admin@touring.com
            <br />
            Password: test1234
            <br />
          </Typography>
        </Box>
      </Container>
    </>
  );
}
