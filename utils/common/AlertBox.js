import { forwardRef } from 'react';
import { styled } from '@mui/system';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const StyledBox = styled(Box)({
  marginTop: 10,
  marginBottom: 10,
  borderRadius: 1,
});

export const AlertBox = forwardRef(function Alert(props, ref) {
  return (
    <StyledBox>
      <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />
    </StyledBox>
  );
});
