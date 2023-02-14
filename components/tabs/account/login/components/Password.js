import { useContext } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Button } from '@mui/material';
import { DataContext } from '@pages/account/profile';

const Wrapper = styled(Box)({
  '&:not(:last-child)': {
    borderBottom: '1px solid var(--dividerColor)',
  },
  padding: '1rem 0',
});

const SingleRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

export default function Password() {
  const { data, session } = useContext(DataContext);
  const userData = data.result;

  return (
    <>
      {userData.password && (
        <Wrapper>
          <SingleRow>
            <Typography variant="body1" sx={{ my: 1 }}>
              Password
            </Typography>
            <Button variant="text">
              {!userData.password ? 'Add' : 'Edit'}
            </Button>
          </SingleRow>
          <Typography variant="body1">
            {!userData.password ? 'Not Provided' : '**********'}
          </Typography>
        </Wrapper>
      )}
    </>
  );
}
