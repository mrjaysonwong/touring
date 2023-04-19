import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Typography, Box, Container, Button } from '@mui/material';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | Touring</title>
      </Head>

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
            src="https://res.cloudinary.com/dc6ae5jse/image/upload/v1677148900/404_Page_Not_Found__Monochromatic_zcyyla.svg"
            width={240}
            height={240}
            alt="Page Not Found"
            priority
            quality={90}
          />
          <Typography variant="body1" sx={{ px: 5 }}>
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL.
          </Typography>
          <Link href="/">
            <Button variant="contained" sx={{ mt: 5 }}>
              Go to homepage
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}
