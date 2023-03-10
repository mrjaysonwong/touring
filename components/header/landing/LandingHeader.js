import Link from 'next/link';
import { styled } from '@mui/system';
import { Button, Box, Typography, CardMedia } from '@mui/material';

const Wrapper = styled(Box)({
  margin: '3.5rem 0',
  height: '90vh',
  position: 'relative',
});

const StyledCardMedia = styled(CardMedia)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const OverlayTitle = styled(Box)({
  position: 'absolute',
  zIndex: 1,
  width: '100%',
  minHeight: '90vh',
  padding: '0 1.5rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
});

const BgOverlay = styled(Box)({
  position: 'absolute',
  minHeight: '90vh',
  width: '100%',
  background: 'var(--bgOverlayColor)',
});

const Header = ({ data }) => {
  return (
    <>
      <Wrapper>
        <StyledCardMedia
          component="video"
          src="/assets/hotairballoon.mp4"
          autoPlay
          muted
          loop
        />
        <OverlayTitle>
          <Typography variant="h4">Enjoy Your Tour With Us</Typography>
          <Typography variant="body2">
            Discover Beautiful Places with secret offers of up to -70% off the
            best every weekend.
          </Typography>
          <Link href="/tours" passHref>
            <Button variant="contained" color="secondary" sx={{ my: 2 }}>
              Book Now
            </Button>
          </Link>
          {data.token && (
            <Link href="/dashboard" passHref>
              <Button variant="contained" color="secondary" sx={{ my: 2 }}>
                Test Dashboard
              </Button>
            </Link>
          )}
        </OverlayTitle>
        <BgOverlay />
      </Wrapper>
    </>
  );
};

export default Header;
