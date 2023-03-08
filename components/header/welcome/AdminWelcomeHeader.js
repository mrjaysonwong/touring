import Image from 'next/image';
import Link from 'next/link';
import { Typography, Box, Button } from '@mui/material';

export default function AdminWelcomeHeader() {
  return (
    <>
      <Image
        src="https://res.cloudinary.com/dc6ae5jse/image/upload/v1677148660/traveling_embgov.svg"
        width={240}
        height={240}
        alt="traveling"
        priority
      />

      <Typography variant="body1">
        You are now minutes away from hosting a tour. Enjoy!
      </Typography>

      <Box sx={{ my: 2 }}>
        <Link href="/dashboard">
          <Button variant="contained" color="secondary">
            Create my first tour
          </Button>
        </Link>
      </Box>
    </>
  );
}
