import { useContext, useState } from 'react';
import { styled } from '@mui/system';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { DataContext } from '@pages/account/profile';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema } from '@utils/yup/credentials/CredentialsSchema';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
  '& .password': {
    width: '100%',
  },
}));

export default function Password() {
  const { data, token, breakpointSm } = useContext(DataContext);
  const userData = data.result;

  const [editForm, setEditForm] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [showPassword, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const handleClick = () => {
    setEditForm(true);
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

  const handleCurrentPassword = (event) => {};

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      {userData.password && (
        <Wrapper>
          {!editForm && (
            <SingleRow>
              <Typography variant="body1" sx={{ my: 1 }}>
                Change Password
              </Typography>
              <Button variant="text" onClick={handleClick}>
                {!userData.password ? 'Add' : 'Edit'}
              </Button>
            </SingleRow>
          )}

          {editForm && (
            <form>
              <StyledBox breakpoint={`${breakpointSm}`}>
                <Typography variant="body1" sx={{ my: 1 }}>
                  Current Password
                </Typography>

                <TextField
                  id="currentPassword"
                  className="password"
                  name="currentPassword"
                  type={showPassword ? 'text' : 'password'}
                  error={Boolean(errors.currentPassword)}
                  {...register('currentPassword')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Typography variant="body2" color="error">
                  {errors.currentPassword?.message}
                </Typography>

                <Typography variant="body1" sx={{ my: 1 }}>
                  New Password
                </Typography>

                <TextField
                  id="newPassword"
                  className="password"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  error={Boolean(errors.newPassword)}
                  {...register('newPassword')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Typography variant="body2" color="error">
                  {errors.newPassword?.message}
                </Typography>

                <Typography variant="body1" sx={{ my: 1 }}>
                  Confirm New Password
                </Typography>

                <TextField
                  id="passwordConfirm"
                  className="password"
                  name="passwordConfirm"
                  type={showPassword ? 'text' : 'password'}
                  error={Boolean(errors.passwordConfirm)}
                  {...register('passwordConfirm')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Typography variant="body2" color="error">
                  {errors.passwordConfirm?.message}
                </Typography>
              </StyledBox>

              <Button variant="text" sx={{ mt: 2 }}>
                Forgot password?
              </Button>

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
          )}
        </Wrapper>
      )}
    </>
  );
}
