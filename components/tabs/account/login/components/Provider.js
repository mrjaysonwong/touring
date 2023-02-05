import { useContext } from 'react';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { Box, Typography, Button } from '@mui/material';
import { DataContext } from '@pages/account/profile';

const Wrapper = styled(Box)({
  '&:not(:last-child)': {
    borderBottom: '1px solid var(--dividerColor)',
  },
  padding: '1rem 0',
  '.provider': {
    textTransform: 'lowerCase',
  },
  '.provider:first-letter': {
    textTransform: 'upperCase',
  },
});

export default function Provider() {
  const theme = useTheme();
  const themeMode = theme.palette.mode;

  const { session } = useContext(DataContext);
  const userData = session.result;

  return (
    <>
      {userData.authProvider && (
        <Wrapper>
          <Typography variant="body1" sx={{ my: 1 }}>
            Connected Account
          </Typography>
          <Typography variant="body1" sx={{ my: 1 }}>
            Touring will only have access to your name and email.
          </Typography>

          <Box sx={{ display: 'flex' }}>
            <Button variant="outlined" color="primary" className="provider">
              <Image
                src={
                  userData.authProvider === 'google'
                    ? `/assets/${userData.authProvider}.svg`
                    : `/assets/github-${
                        themeMode === 'dark' ? 'light' : 'dark'
                      }.svg`
                }
                alt={`${userData.authProvider} icon`}
                width={32}
                height={32}
                quality={100}
                priority
              />

              <Typography variant="body1" className="provider" sx={{ m: 1 }}>
                {userData.authProvider}
              </Typography>
              <Typography variant="body1" color="primary" className="provider">
                (Linked)
              </Typography>
            </Button>
          </Box>
        </Wrapper>
      )}
    </>
  );
}
