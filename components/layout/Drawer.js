import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { styled } from '@mui/system';
import {
  Toolbar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
  Avatar,
  Typography,
  useTheme,
  Badge,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { navItems } from '@src/routes/navbar-routes';

const Wrapper = styled(List)({
  '.active, .active.svg': {
    color: 'var(--navItemActiveColor)',
  },
});

export default function Sidebar({
  handleDrawerToggle,
  session,
  isAdmin,
  isUser,
}) {
  const router = useRouter();

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 1,
          }}
        >
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
                priority
              />
            </a>
          </Link>
        </Toolbar>

        <Wrapper>
          {!session && (
            <>
              <Link href="/login">
                <Button
                  variant="outlined"
                  sx={{
                    my: 1,
                    borderRadius: 13,
                    width: '90%',
                    textTransform: 'initial',
                  }}
                >
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outlined"
                  sx={{
                    my: 1,
                    borderRadius: 13,
                    width: '90%',
                    textTransform: 'initial',
                  }}
                >
                  Sign up
                </Button>
              </Link>
              <Divider sx={{ my: 1 }} />
            </>
          )}
          {session?.user && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  my: 1,
                }}
              >
                {session.user.image ? (
                  <Avatar
                    src={session.user.image}
                    sx={{ width: 64, height: 64 }}
                  />
                ) : (
                  <AccountCircleIcon sx={{ width: 64, height: 64 }} />
                )}

                <Typography variant="body1" sx={{ fontWeight: 600, my: 2 }}>
                  {session.user.name}
                </Typography>
              </Box>

              {isUser && (
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 13,
                    width: '90%',
                    textTransform: 'initial',
                    my: 1,
                  }}
                  onClick={() => {
                    router.push({
                      pathname: '/account/profile',
                      query: { tab: 'personal' },
                    });
                  }}
                  startIcon={<ManageAccountsIcon />}
                >
                  Account
                </Button>
              )}

              {isAdmin && (
                <Link href="/dashboard">
                  <Button
                    variant="outlined"
                    sx={{
                      my: 1,
                      borderRadius: 13,
                      width: '90%',
                      textTransform: 'initial',
                    }}
                    startIcon={<DashboardCustomizeIcon />}
                  >
                    Dashboard
                  </Button>
                </Link>
              )}

              {isUser && (
                <Link href="/account/bookings">
                  <Button
                    variant="outlined"
                    sx={{
                      my: 1,
                      borderRadius: 13,
                      width: '90%',
                      textTransform: 'initial',
                    }}
                    startIcon={
                      <Badge
                        badgeContent={4}
                        color="secondary"
                        showZero
                        overlap="circular"
                      >
                        <LoyaltyIcon />
                      </Badge>
                    }
                  >
                    Booking(s)
                  </Button>
                </Link>
              )}

              {session?.user && (
                <>
                  <Button
                    variant="outlined"
                    onClick={handleSignOut}
                    sx={{
                      borderRadius: 13,
                      width: '90%',
                      textTransform: 'initial',
                      my: 1,
                    }}
                    startIcon={<LogoutIcon />}
                  >
                    Log out
                  </Button>
                </>
              )}

              <Divider sx={{ my: 1 }} />
            </>
          )}

          {navItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <Link href={item.path} passHref>
                <ListItemButton
                  className={router.pathname === item.path ? 'active' : ''}
                >
                  <ListItemIcon
                    className={router.pathname === item.path ? 'active' : ''}
                  >
                    {router.pathname === item.path
                      ? item.icon
                      : item.iconOutline}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </Wrapper>
      </Box>
    </>
  );
}
