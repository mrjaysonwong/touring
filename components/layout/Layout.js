import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from 'next-themes';
import { Tooltip, IconButton, Box, SvgIcon, css } from '@mui/material';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const MainContainer = styled('main')({
  minHeight: '100vh',
});

const ThemeToggler = styled(Box)({
  backgroundColor: 'var(--floatingIconColor)',
  color: '#8de8ff',
  backdropFilter: 'blur(3px)',
  position: 'fixed',
  zIndex: 2,
  bottom: '40px',
  right: '30px',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  '& svg': {
    fontSize: '32px',
  },
});

export default function Layout({ children }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div
        css={css`
          min-height: 162.38px;
        `}
      ></div>
    );

  return (
    <>
      {router.pathname !== '/login' && router.pathname !== '/signup' && (
        <Navbar />
      )}
      <MainContainer>
        <ThemeToggler>
          <Tooltip
            title={`Toggle ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            placement="left"
          >
            <IconButton
              color="inherit"
              onClick={() =>
                setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
              }
            >
              {resolvedTheme === 'dark' ? (
                <SvgIcon htmlColor="var(--lightIcon)">
                  <LightModeOutlinedIcon />
                </SvgIcon>
              ) : (
                <SvgIcon>
                  <Brightness4OutlinedIcon />
                </SvgIcon>
              )}
            </IconButton>
          </Tooltip>
        </ThemeToggler>
        {children}
      </MainContainer>
      <Footer />
    </>
  );
}
