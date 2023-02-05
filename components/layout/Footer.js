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
            py: 5,
            px: 2,
            bgcolor: '#313131',
            color: '#fff',
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
          Copyright 2022-2023 by Mr Jayson Wong <br />
          Touring App is Powered by NextJS and MUI.
        </Typography>
      </Box>
    </>
  );
}
