import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  Badge,
} from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LogoutIcon from '@mui/icons-material/Logout';
import { navItems } from '@src/routes/navbar-routes';
import Sidebar from './Drawer';

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

const drawerWidth = 260;

export default function Navbar() {
  const router = useRouter();

  const { data: session, status } = useSession();
  const isAdmin = session?.user.role === 'admin';
  const isUser = session?.user.role === 'user';

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

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
          elevation={1}
          sx={{
            display: 'flex',
            justifyContent: 'center',
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
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Link href="/" passHref>
                  <a>
                    <Image
                      src={`/assets/touring-${
                        isDarkMode ? 'light' : 'dark'
                      }.svg`}
                      alt="Touring app logo"
                      width={140}
                      height={40}
                      quality={100}
                      tabIndex="1"
                      priority
                    />
                  </a>
                </Link>
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
                <Link key={item.title} href={item.path} passHref>
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
                </Link>
              ))}
            </Box>

            <Box
              sx={{
                ml: 'auto',
                display: { xs: 'none', lg: 'flex' },
              }}
            >
              {!session && (
                <>
                  <Link href="/login" passHref>
                    <Button color="inherit" disableRipple>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Log in
                      </Typography>
                    </Button>
                  </Link>
                  <Link href="/signup" passHref>
                    <Button color="inherit" disableRipple>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Sign up
                      </Typography>
                    </Button>
                  </Link>
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

                    {isUser && (
                      <MenuItem onClick={handleMenuClick}>
                        <ListItemIcon>
                          <ManageAccountsIcon />
                        </ListItemIcon>
                        Account
                      </MenuItem>
                    )}

                    {isAdmin && (
                      <Link href="/dashboard" passHref>
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <DashboardCustomizeIcon />
                          </ListItemIcon>
                          Dashboard
                        </MenuItem>
                      </Link>
                    )}

                    {isUser && (
                      <Link href="/account/bookings" passHref>
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <Badge
                              badgeContent={4}
                              color="secondary"
                              showZero
                              overlap="circular"
                            >
                              <LoyaltyIcon />
                            </Badge>
                          </ListItemIcon>
                          Booking(s)
                        </MenuItem>
                      </Link>
                    )}
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
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: isDarkMode ? 'rgb(0,0,0)' : '#f5f5f5',
            },
          }}
        >
          <Sidebar
            handleDrawerToggle={handleDrawerToggle}
            session={session}
            isAdmin={isAdmin}
            isUser={isUser}
          />
        </Drawer>
      </Box>
    </>
  );
}
