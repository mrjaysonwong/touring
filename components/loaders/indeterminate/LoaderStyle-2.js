import Image from 'next/image';
import { keyframes, styled } from '@mui/system';
import { Box, useTheme } from '@mui/material';

const Wrapper = styled(Box)({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Center = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const animate = keyframes({
  '0%': {
    transform: 'scale(0)',
  },
  '50%': {
    transform: 'scale(1)',
  },
  '100%': {
    transform: 'scale(0)',
  },
});

const Wave = styled(Box)({
  width: '5px',
  height: '50px',
  background: 'linear-gradient(45deg, deepskyblue, seashell)',
  margin: '10px',
  animation: `${animate} 1s linear infinite`,
  borderRadius: '20px',
  '&:nth-of-type(2)': {
    animationDelay: '0.1s',
  },
  '&:nth-of-type(3)': {
    animationDelay: '0.2s',
  },
  '&:nth-of-type(4)': {
    animationDelay: '0.3s',
  },
  '&:nth-of-type(5)': {
    animationDelay: '0.4s',
  },
  '&:nth-of-type(6)': {
    animationDelay: '0.5s',
  },
  '&:nth-of-type(7)': {
    animationDelay: '0.6s',
  },
  '&:nth-of-type(8)': {
    animationDelay: '0.7s',
  },
  '&:nth-of-type(9)': {
    animationDelay: '0.8s',
  },
  '&:nth-of-type(10)': {
    animationDelay: '0.9s',
  },
});

export default function LinearIndeterminate() {
  const theme = useTheme();

  return (
    <>
      <Wrapper>
        <Box
          sx={{
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

        <Center>
          <Wave></Wave>
          <Wave></Wave>
          <Wave></Wave>
          <Wave></Wave>
          <Wave></Wave>
          <Wave></Wave>
          <Wave></Wave>
          <Wave></Wave>
          <Wave></Wave>
          <Wave></Wave>
          <Wave></Wave>
        </Center>
      </Wrapper>
    </>
  );
}
