import Image from 'next/image';
import { styled } from '@mui/system';
import { Box, Container, useTheme, LinearProgress } from '@mui/material';

const Wrapper = styled(Box)({
  width: '100%',
  height: '90vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default function LinearIndeterminate() {
  const theme = useTheme();

  return (
    <>
      <Wrapper>
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
          <LinearProgress sx={{ borderRadius: '6px' }} />
        </Container>
      </Wrapper>
    </>
  );
}
