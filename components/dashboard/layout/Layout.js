import { useState, createContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Avatar,
  Menu,
  MenuItem,
  SvgIcon,
  useTheme,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ColorModeContext from '@contexts/ColorModeContext';
import General from '../sidenav/general';
import Management from '../sidenav/management';
import Application from '../sidenav/application';
import Searchbar from '../search';
import Footer from '@components/layout/Footer';
import PrivacyPolicy from '@components/layout/PrivacyPolicy';

export const SideNavContext = createContext();

const Wrapper = styled('div')({
  ' a, button': {
    textTransform: 'initial',
  },
  ' a:hover, button:hover': {
    background: 'none',
  },
  '.active': {
    color: 'var(--navItemActiveColor)',
  },
});

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  '&:not(:last-child):after': {
    content: "'•'",
  },
});

const ThemeToggler = styled(Box)({
  display: 'flex',
  borderRadius: '50%',
  margin: '0.5rem 0.2rem',
  ' &:hover': {
    backgroundColor: 'rgba(129, 129, 129, 0.2)',
  },
});

const drawerWidth = 250;

export default function Layout(props) {
  const { children } = props;

  const router = useRouter();

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const { data: session, status } = useSession();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          py: 2,
        }}
      >
        <Link href="/dashboard" passHref>
          <a>
            <Image
              src={`/assets/touring-${isDarkMode ? 'light' : 'dark'}.svg`}
              alt="Touring app logo"
              width={130}
              height={30}
              quality={100}
              tabIndex="1"
              priority
            />
          </a>
        </Link>
      </Toolbar>

      <SideNavContext.Provider value={router}>
        <General />
        <Management />
        <Application />
      </SideNavContext.Provider>
    </>
  );

  return (
    <Wrapper>
      <Box sx={{ display: 'flex', minheight: '100vh' }}>
        <AppBar
          position="fixed"
          color="default"
          elevation={1}
          sx={{
            width: { lg: `calc(100% - ${drawerWidth}px)` },
            ml: { lg: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Searchbar darkmode={isDarkMode} />

            {session?.user && (
              <>
                <Box sx={{ display: 'flex', ml: 'auto' }}>
                  <ThemeToggler>
                    <ColorModeContext.Consumer>
                      {({ toggleColorMode }) => (
                        <Tooltip
                          title={`Toggle ${isDarkMode ? 'light' : 'dark'} mode`}
                          placement="bottom"
                        >
                          <IconButton color="inherit" onClick={toggleColorMode}>
                            {isDarkMode ? (
                              <SvgIcon htmlColor="var(--lightIcon)">
                                <LightModeOutlinedIcon />
                              </SvgIcon>
                            ) : (
                              <SvgIcon htmlColor="var(--darkIcon)">
                                <Brightness4OutlinedIcon />
                              </SvgIcon>
                            )}
                          </IconButton>
                        </Tooltip>
                      )}
                    </ColorModeContext.Consumer>
                  </ThemeToggler>

                  <Button
                    id="basic-button"
                    color="inherit"
                    disableRipple
                    aria-label="Profile Menu"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    {session.user.image ? (
                      <Avatar src={session.user.image} />
                    ) : (
                      <AccountCircleIcon sx={{ width: 42, height: 42 }} />
                    )}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mx: 1,
                        color: isDarkMode ? '#f5f5f5' : '#000000de',
                      }}
                    >
                      {session.user.image ? (
                        <Avatar
                          src={session.user.image}
                          sx={{ width: 42, height: 42 }}
                        />
                      ) : (
                        <AccountCircleIcon sx={{ width: 42, height: 42 }} />
                      )}

                      <Typography variant="body1" sx={{ mx: 1 }}>
                        {session.user.name}
                      </Typography>
                    </ListItemIcon>

                    <Divider sx={{ my: 1 }} />

                    <Link href="/">
                      <MenuItem>
                        <ListItemIcon>
                          <HomeIcon />
                        </ListItemIcon>
                        Home
                      </MenuItem>
                    </Link>

                    <Link href="/dashboard/account">
                      <MenuItem>
                        <ListItemIcon>
                          <ManageAccountsIcon />
                        </ListItemIcon>
                        Account
                      </MenuItem>
                    </Link>

                    <Divider />
                    <MenuItem onClick={handleSignOut}>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      Log out
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
          aria-label="dashboard items"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            elevation={1}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', lg: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', lg: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                bgcolor: isDarkMode ? 'rgb(30,30,30)' : '',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <Toolbar />
          <Box sx={{ mb: 15, minHeight: '100vh' }}>{children}</Box>

          {/* <Footer /> */}

          <Divider />
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <StyledBox>
              <Typography variant="body2" sx={{ mr: 1 }}>
                ©2022-2023 Touring Ltd.
              </Typography>
            </StyledBox>

            <StyledBox>
              <PrivacyPolicy />
            </StyledBox>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
}
