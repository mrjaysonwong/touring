import { styled } from '@mui/system';
import { Box, Typography, Button } from '@mui/material';

const Wrapper = styled(Box)({
  '&:not(:last-child)': {
    borderBottom: '1px solid var(--dividerColor)',
  },
  padding: '1rem 0',
});

export default function Deactivate() {
  return (
    <>
      <Wrapper>
        <Typography variant="body1">Deactivate</Typography>
        <Typography variant="body1" sx={{ my: 1 }}>
          Deactivating your account means that your account will no longer be
          available. You will not be able to sign in and your profile will not
          be accessible. Any reviews, photos, and tips that you have contributed
          may continue to be displayed on the site.
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Button variant="outlined" color="primary">
            Deactivate My Account
          </Button>
        </Box>
      </Wrapper>
    </>
  );
}
