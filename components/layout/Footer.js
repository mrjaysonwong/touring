import Image from 'next/image';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <>
      <Box>
        <Typography
          component="div"
          variant="body2"
          sx={{
            textAlign: 'center',
            p: 2,
            bgcolor: 'rgba(34, 34, 34, 1)',
            color: '#f5f5f5',
          }}
        >
          <Box>
            <Image
              src="/assets/mylogo.png"
              alt="Jayson Wong logo"
              width="240px"
              height="60px"
              quality={100}
              priority
            />
          </Box>
          <Typography variant="body2">
            Copyright 2022-2023 by Mr Jayson Wong <br />
            Touring App is Powered by NextJS and MUI.
          </Typography>
        </Typography>
      </Box>
    </>
  );
}
