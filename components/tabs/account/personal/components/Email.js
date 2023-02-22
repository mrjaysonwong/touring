import { useState, useContext } from 'react';
import { styled } from '@mui/system';
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  emailSchema,
  newEmailSchema,
} from '@utils/yup/account-settings/PInfoSchema';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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

const StyledBox = styled(Box)(({ breakpoint }) => ({
  width: breakpoint === 'true' ? '50%' : '100%',
  '& .email, .password, .newEmail, .emailConfirm': {
    width: '100%',
    margin: '6px 0',
  },
}));

export default function Email() {
  const { data, token, breakpointSm } = useContext(DataContext);
  const userData = data.result;

  const [editForm, setEditForm] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [email, setEmail] = useState('');

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [showPassword, setShow] = useState(false);

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

  const handleClickShowPassword = () => {
    setShow(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = (values) => {
    console.log(values);
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
                  <StyledBox breakpoint={`${breakpointSm}`}>
                    <Typography variant="body1">Current Email</Typography>
                    <Typography variant="body1" sx={{ mt: '13px', mb: 2 }}>
                      {userData.email}
                    </Typography>

                    <Typography variant="body1">New Email</Typography>

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

                    <Typography variant="body1">Confirm New Email</Typography>
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
                  </StyledBox>

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
                  <StyledBox breakpoint={`${breakpointSm}`}>
                    <Typography variant="body1">Email</Typography>

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

                    <Typography variant="body1">Confirm Password</Typography>

                    <TextField
                      id="password"
                      className="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      error={Boolean(errors1.password)}
                      {...register1('password')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Typography variant="body2" color="error">
                      {errors1.password?.message}
                    </Typography>
                  </StyledBox>

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
