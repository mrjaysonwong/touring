import { useState, useContext } from 'react';
import { styled } from '@mui/system';
import { Box, Button, Typography, TextField } from '@mui/material';
import { DataContext } from '@pages/account/profile';

const Wrapper = styled(Box)({
  '&:not(:last-child)': {
    borderBottom: '1px solid var(--dividerColor)',
  },
  padding: '1rem 0',
  '.email, .password': {
    width: '100%',
  },
});

const SingleRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

export default function Email() {
  const { data, token } = useContext(DataContext);
  const userData = data.result;

  const [editForm, setEditForm] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [email, setEmail] = useState(userData.email);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClick = () => {
    setEditForm(true);
    setIsSave(false);
    setShowError(false);
  };

  const handleCancel = () => {
    setEditForm(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <Wrapper>
        {!editForm && (
          <>
            <SingleRow>
              <Typography variant="body1">Email</Typography>
              <Button variant="text" onClick={handleClick}>
                Edit
              </Button>
            </SingleRow>
            <Typography variant="body1">{token.user.email}</Typography>
          </>
        )}
        {editForm && (
          <form>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Email
            </Typography>
            <TextField
              id="email"
              className="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            <Typography variant="body1" sx={{ my: 1 }}>
              Confirm Password
            </Typography>
            <TextField
              id="password"
              className="password"
              name="password"
              type="password"
              placeholder="Confirm Password"
            />
            <Box sx={{ mt: 2 }}>
              <Button variant="contained">Save</Button>
              <Button variant="outlined" onClick={handleCancel} sx={{ ml: 1 }}>
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Wrapper>
    </>
  );
}
