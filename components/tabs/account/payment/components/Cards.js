import { styled } from '@mui/system';
import { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { DataContext } from '@pages/account/profile';
import { LoadSkeleton } from '@components/loaders/skeleton/LoadingSkeleton';

const Wrapper = styled(Box)({
  '&:not(:last-child)': {
    borderBottom: '1px solid var(--dividerColor)',
  },
  padding: '1rem 0',
});

export default function Cards() {
  const { data, session } = useContext(DataContext);
  const userData = data.result;

  return (
    <>
      {/* <LoadSkeleton loading /> */}

      <Wrapper>
        <Typography variant="body1">Your stored cards</Typography>

        {userData.paymentCards ? (
          'Visa-Test'
        ) : (
          <>
            <Typography variant="body1" sx={{ color: 'gray', my: 1 }}>
              No cards on file
            </Typography>
            <Typography variant="body1">
              You can choose to save your payment card at the checkout for
              faster booking in the future.
            </Typography>
          </>
        )}
      </Wrapper>
    </>
  );
}
