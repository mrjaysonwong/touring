import Layout from '@components/layout/Layout';
import Link from 'next/link';
import {
  Container,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { tourRecommendations } from '@src/recommendations';

const StyledImage = styled('img')({
  borderRadius: '50%',
  width: '120px',
  height: '120px',
  objectFit: 'cover',
});

export default function WelcomeHeader({ data }) {
  const tours = tourRecommendations.map((tour) => (
    <Link href="/" key={tour.img}>
      <Box sx={{ cursor: 'pointer', m: 2 }}>
        <ImageListItem
          sx={{
            display: 'flex',
            alignItems: 'center',
            my: 1,
          }}
        >
          <StyledImage
            src={`${tour.img}`}
            alt={`${tour.title}`}
            loading="lazy"
          />
        </ImageListItem>

        <Typography variant="body1">{tour.title}</Typography>
      </Box>
    </Link>
  ));

  return (
    <>
      <Layout>
        <Container
          sx={{
            my: 15,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Welcome {data.user.name}!
          </Typography>
          <br />
          <Typography variant="body1">
            Don&apos;t have a tour to choose from?
          </Typography>
          Here are some of our recommendations.
          <ImageList
            sx={{
              display: { lg: 'flex', sm: 'flex', xs: 'block' },
              justifyContent: 'center',
              mt: 2,
            }}
          >
            {tours}
          </ImageList>
          <br />
          <Link href="/">
            <Button
              variant="contained"
              color="secondary"
              sx={{ fontWeight: '600' }}
            >
              Not Interested
            </Button>
          </Link>
        </Container>
      </Layout>
    </>
  );
}
