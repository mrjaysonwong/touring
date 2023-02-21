import { useState, useContext } from 'react';
import { styled } from '@mui/system';
import { Box, Button, Typography, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  emailSchema,
  newEmailSchema,
} from '@utils/yup/account-settings/PInfoSchema';
import { DataContext } from '@pages/account/profile';

const Wrapper = styled(Box)({
  '&:not(:last-child)': {
    borderBottom: '1px solid var(--dividerColor)',
  },
  padding: '1rem 0',
  '.email, .newEmail, .emailConfirm, .password': {
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
  const [email, setEmail] = useState('');

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(newEmailSchema),
  });
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1, isSubmitting: isSubmitting1 },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

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

  const onSubmit = (values) => {
    // console.log(values);
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
            <Typography variant="body1">{userData.email}</Typography>
          </>
        )}

        {editForm && (
          <>
            {userData.authProvider ? (
              <>
                <form>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Current Email
                  </Typography>
                  <Typography variant="body1">{userData.email}</Typography>
                  <br />

                  <Typography variant="body1" sx={{ mb: 1 }}>
                    New Email
                  </Typography>

                  <TextField
                    id="newEmail"
                    className="newEmail"
                    name="newEmail"
                    error={Boolean(errors.newEmail)}
                    onChange={handleEmailChange}
                    {...register('newEmail')}
                  />

                  <Typography variant="body2" color="error">
                    {errors.newEmail?.message}
                  </Typography>

                  <Typography variant="body1" sx={{ my: 1 }}>
                    Confirm New Email
                  </Typography>
                  <TextField
                    id="emailConfirm"
                    className="emailConfirm"
                    name="emailConfirm"
                    error={Boolean(errors.emailConfirm)}
                    onChange={handleEmailChange}
                    {...register('emailConfirm')}
                  />

                  <Typography variant="body2" color="error">
                    {errors.emailConfirm?.message}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitting}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{ ml: 1 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              </>
            ) : (
              <>
                <form>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Email
                  </Typography>

                  <TextField
                    id="email"
                    className="email"
                    name="email"
                    defaultValue={userData.email}
                    error={Boolean(errors1.email)}
                    onChange={handleEmailChange}
                    {...register1('email')}
                  />

                  <Typography variant="body2" color="error">
                    {errors1.email?.message}
                  </Typography>

                  <Typography variant="body1" sx={{ my: 1 }}>
                    Confirm Password
                  </Typography>
                  <TextField
                    id="password"
                    className="password"
                    name="password"
                    type="password"
                    error={Boolean(errors1.password)}
                  />

                  <Typography variant="body2" color="error">
                    {errors1.password?.message}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit1(onSubmit)}
                      disabled={isSubmitting1}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{ ml: 1 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              </>
            )}
          </>
        )}
      </Wrapper>
    </>
  );
}
