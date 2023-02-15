import { useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import {
  AppBar,
  Toolbar,
  Box,
  Drawer,
  IconButton,
  Typography,
  Button,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LogoutIcon from '@mui/icons-material/Logout';
import { navItems } from '@src/routes';
import Sidebar from './Drawer';
import NavSkeleton from '@components/placeholder/component/NavSkeleton';

const Wrapper = styled('div')({
  '& a, & button': {
    textTransform: 'initial',
  },
  '& a:hover, & button: hover': {
    background: 'none',
  },

  '.active': {
    color: 'var(--navItemActiveColor)',
  },
});

const drawerWidth = 260;

export default function Navbar() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = () => {
    setAnchorEl(null);
    router.push({
      pathname: '/account/profile',
      query: { tab: 'personal' },
    });
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

  return (
    <>
      <Wrapper>
        <AppBar
          position="fixed"
          color="default"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: 65,
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
            <Tooltip title="Touring logo" arrow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src={`/assets/touring-${
                    theme.palette.mode === 'dark' ? 'light' : 'dark'
                  }.png`}
                  alt="Touring app logo"
                  width={140}
                  height={40}
                  quality={100}
                  tabIndex="1"
                  priority
                />
              </Box>
            </Tooltip>

            <Box
              sx={{
                display: { xs: 'none', lg: 'flex' },
                maxWidth: 900,
                ml: 3,
              }}
            >
              {navItems.map((item) => (
                <NextLink key={item.title} href={item.path} passHref>
                  <Button
                    disableRipple
                    color="inherit"
                    className={router.pathname === item.path ? 'active' : ''}
                    sx={{
                      px: 2,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                  </Button>
                </NextLink>
              ))}
            </Box>

            <Box
              sx={{
                ml: 'auto',
                display: { xs: 'none', lg: 'flex' },
              }}
            >
              {status === 'loading' && (
                <Avatar sx={{ mr: 1 }}>
                  <NavSkeleton />
                </Avatar>
              )}

              {session === null && (
                <>
                  <NextLink href="/login" passHref>
                    <Button color="inherit" disableRipple>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Log in
                      </Typography>
                    </Button>
                  </NextLink>
                  <NextLink href="/signup" passHref>
                    <Button color="inherit" disableRipple>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Sign up
                      </Typography>
                    </Button>
                  </NextLink>
                </>
              )}

              {session?.user && (
                <>
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
                    <Box sx={{ pb: 1, px: 1.5 }}>
                      <ListItemIcon
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        {session.user.image ? (
                          <Avatar sx={{ mr: 1 }} src={session.user.image} />
                        ) : (
                          <AccountCircleIcon
                            sx={{ mr: 1, width: 42, height: 42 }}
                          />
                        )}
                        <Typography variant="body1">
                          {session.user.name}
                        </Typography>
                      </ListItemIcon>
                    </Box>
                    <Divider />

                    <MenuItem onClick={handleMenuClick}>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      Account
                    </MenuItem>

                    <NextLink href="/account/bookings" passHref>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <EventNoteIcon />
                        </ListItemIcon>
                        My Bookings (0)
                      </MenuItem>
                    </NextLink>
                    <Divider />
                    <MenuItem onClick={handleSignOut}>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      Log out
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Wrapper>
      <Box component="nav">
        <Drawer
          variant="temporary"
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
          <Sidebar handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </Box>
    </>
  );
}
