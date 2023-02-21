import { useEffect, useState, forwardRef } from 'react';
import Image from 'next/image';
import Layout from '@components/layout/Layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Link } from '@utils/common/Link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@utils/yup/credentials/CredentialsSchema';
import { styled } from '@mui/system';
import {
  Box,
  Container,
  Button,
  Typography,
  TextField,
  Divider,
  InputAdornment,
  IconButton,
  Link as MUILink,
  Tooltip,
  Snackbar,
  Stack,
  Alert as MuiAlert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error';
import { createUser } from '@utils/apis/users/api';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledForm = styled('form')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1.2rem',
  borderRadius: 8,
  boxShadow:
    'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.4) 0px 0px 0px 1px inset',
  '.login-text': {
    color: '#13a1ff',
  },
});

const SingleRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const SingleColumn = styled(Box)({
  display: 'block',
});

export default function Register() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.up('sm'));

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful && !showError) {
      reset();
    }
  }, [isSubmitSuccessful, reset, showError]);

  const [showPassword, setShow] = useState(false);

  const handleClickShowPassword = () => {
    setShow(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (values) => {
    try {
      const data = await createUser(values);
      if (data) {
        setOpen(true);
        setShowError(false);
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.message);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Layout>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 10,
            width: 'min(95%, 100vw)',
          }}
        >
          <StyledForm
            autoComplete="off"
            sx={{ width: breakpoint ? '40%' : '100%' }}
          >
            <Box sx={{ position: 'absolute', top: -40, left: 0 }}>
              <Tooltip title="Touring logo" arrow>
                <MUILink component={Link} href="/">
                  <Image
                    src={`/assets/touring-${
                      theme.palette.mode === 'dark' ? 'light' : 'dark'
                    }.png`}
                    alt="Touring logo"
                    width={85}
                    height={25}
                    priority
                  />
                </MUILink>
              </Tooltip>
            </Box>

            <Typography variant="h5" sx={{ mb: 1 }}>
              Create your account
            </Typography>

            {!showError && (
              <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar
                  open={open}
                  autoHideDuration={1000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%' }}
                  >
                    Successfuly Registered!
                  </Alert>
                </Snackbar>
              </Stack>
            )}

            {showError && (
              <Box
                sx={{
                  bgcolor: '#ffebed',
                  border: '2px solid #fc3d31',
                  display: 'flex',
                  alignItems: 'center',
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <ErrorIcon sx={{ mr: 0.5, width: 24, height: 24 }} />{' '}
                  {errorMessage}
                </Typography>
              </Box>
            )}

            <SingleRow>
              <SingleColumn>
                <TextField
                  id="firstName"
                  className="firstName"
                  name="firstName"
                  label="First name"
                  error={Boolean(errors.firstName)}
                  {...register('firstName')}
                  sx={{ mt: 2 }}
                />

                <Typography variant="body2" color="error">
                  {errors.firstName?.message}
                </Typography>
              </SingleColumn>

              <SingleColumn>
                <TextField
                  id="lastName"
                  className="lastName"
                  name="lastName"
                  label="Last name"
                  error={Boolean(errors.lastName)}
                  {...register('lastName')}
                  sx={{ ml: 2, mt: 2 }}
                />

                <Typography variant="body2" color="error" sx={{ ml: 2 }}>
                  {errors.lastName?.message}
                </Typography>
              </SingleColumn>
            </SingleRow>

            <TextField
              id="email"
              name="email"
              label="Email address"
              error={Boolean(errors.email)}
              {...register('email')}
              sx={{ mt: 2 }}
            />

            <Typography variant="body2" color="error">
              {errors.email?.message}
            </Typography>

            <TextField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              error={Boolean(errors.password)}
              {...register('password')}
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
              sx={{ mt: 2 }}
            />

            <Typography variant="body2" color="error">
              {errors.password?.message}
            </Typography>

            <TextField
              id="passwordConfirm"
              name="passwordConfirm"
              label="Confirm Password"
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
              sx={{ mt: 2 }}
            />

            <Typography variant="body2" color="error">
              {errors.passwordConfirm?.message}
            </Typography>

            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              sx={{ my: 2, bgcolor: '#1976d2' }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: '#fff' }}
              >
                Register
              </Typography>
            </Button>

            <Divider
              sx={{ border: '1px thin', borderColor: '#aaaaaa', my: 2 }}
            />

            <Typography variant="body2" align="right">
              Already have an account?{' '}
              <NextLink href="/login" passHref>
                <a className="login-text">Log in</a>
              </NextLink>
            </Typography>
          </StyledForm>
        </Container>
      </Layout>
    </>
  );
}
