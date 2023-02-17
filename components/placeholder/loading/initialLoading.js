import Image from 'next/image';
import {
  Box,
  Container,
  useTheme,
  LinearProgress,
  useMediaQuery,
} from '@mui/material';

export default function InitialLoading() {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container
          sx={{
            width: 'min(30%, 100vw)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Image
              src={`/assets/touring-${
                theme.palette.mode === 'dark' ? 'light' : 'dark'
              }.png`}
              alt="Touring logo"
              width={140}
              height={40}
              priority
            />
          </Box>
          <LinearProgress />
        </Container>
      </Box>
    </>
  );
}
