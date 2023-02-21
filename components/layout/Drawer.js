import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { styled } from '@mui/system';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Avatar,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { navItems } from '@src/routes';

const Wrapper = styled(List)({
  '.active, .active.svg': {
    color: 'var(--navItemActiveColor)',
  },
});

export default function Sidebar({ handleDrawerToggle }) {
  const router = useRouter();

  const { data: session } = useSession();

  const theme = useTheme();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            py: 1.5,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <IconButton sx={{ position: 'absolute', left: 5 }}>
            <CloseIcon />
          </IconButton>
          <Image
            src={`/assets/touring-${
              theme.palette.mode === 'dark' ? 'light' : 'dark'
            }.png`}
            alt="Touring app logo"
            width={140}
            height={40}
            quality={100}
            priority
          />
        </Box>

        <Divider />

        <Wrapper>
          {!session && (
            <>
              <ListItem sx={{ display: 'block' }} disablePadding>
                <NextLink href="/login" passHref>
                  <ListItemButton>
                    <ListItemText primary="Log in" inset />
                  </ListItemButton>
                </NextLink>
                <NextLink href="/signup" passHref>
                  <ListItemButton>
                    <ListItemText primary="Sign up" inset />
                  </ListItemButton>
                </NextLink>
              </ListItem>
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
                }}
              >
                {session.user.image ? (
                  <Avatar
                    src={session.user.image}
                    sx={{ width: 64, height: 64, my: 2 }}
                  />
                ) : (
                  <AccountCircleIcon sx={{ width: 64, height: 64, my: 2 }} />
                )}

                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {session.user.name}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                sx={{
                  mt: 2,
                  borderRadius: 13,
                  width: '90%',
                  textTransform: 'initial',
                }}
                onClick={() => {
                  router.push({
                    pathname: '/account/profile',
                    query: { tab: 'personal' },
                  });
                }}
                startIcon={<PersonIcon />}
              >
                Account
              </Button>

              <NextLink href="/account/bookings">
                <Button
                  variant="outlined"
                  sx={{
                    my: 3,
                    borderRadius: 13,
                    width: '90%',
                    textTransform: 'initial',
                  }}
                  startIcon={<EventNoteIcon />}
                >
                  My Bookings
                </Button>
              </NextLink>
              <Divider />
            </>
          )}

          {navItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <NextLink href={item.path} passHref>
                <ListItemButton
                  className={router.pathname === item.path ? 'active' : ''}
                >
                  <ListItemIcon
                    className={router.pathname === item.path ? 'active' : ''}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </NextLink>
            </ListItem>
          ))}

          {session?.user && (
            <>
              <Divider sx={{ my: 1 }} />
              <ListItem disablePadding>
                <ListItemButton onClick={handleSignOut}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </Wrapper>
      </Box>
    </>
  );
}
