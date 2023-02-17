import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import Navbar from './Navbar';
import Footer from './Footer';
import { Tooltip, IconButton, Box, SvgIcon, useTheme } from '@mui/material';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import ColorModeContext from '@contexts/ColorModeContext';

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
  const theme = useTheme();

  const router = useRouter();

  const isSignUpPage = router.pathname === '/signup';
  const isLoginPage = router.pathname === '/login';

  return (
    <>
      {!isLoginPage && !isSignUpPage && <Navbar />}
      <MainContainer>
        <ThemeToggler>
          <ColorModeContext.Consumer>
            {({ toggleColorMode }) => (
              <>
                <Tooltip
                  title={`Toggle ${
                    theme.palette.mode === 'dark' ? 'light' : 'dark'
                  } mode`}
                  placement="left"
                >
                  <IconButton color="inherit" onClick={toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
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
              </>
            )}
          </ColorModeContext.Consumer>
        </ThemeToggler>
        {children}
      </MainContainer>

      <Footer />
    </>
  );
}
