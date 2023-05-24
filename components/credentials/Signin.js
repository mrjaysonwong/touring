import { useEffect, useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import Layout from '@components/layout/Layout';
import { Link } from '@utils/common/Link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@utils/yup/credentials/CredentialsSchema';
import { signIn } from 'next-auth/react';
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
  useTheme,
  CircularProgress,
  Grid,
  useMediaQuery,
  Chip,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error';
import { sleep } from '@utils/common/Sleep';
import LinearIndeterminate from '@components/loaders/indeterminate/LoaderStyle-2';

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1.2rem',
  borderRadius: 8,
  boxShadow:
    theme.palette.mode === 'light'
      ? 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.4) 0px 0px 0px 1px inset'
      : '',
  '.signup-text, .forgot-password': {
    color: '#13a1ff',
  },
  ' .email, .password': {
    width: '100%',
  },
}));

const ErrorBox = styled(Box)({
  backgroundColor: '#ffebed',
  border: '2px solid #fc3d31',
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '3px',
  marginBottom: '1rem',
});

const ProviderButton = styled(Button)({
  textTransform: 'initial',
  color: 'inherit',
  border: '1px solid #bdbdbd',
  marginBottom: '1rem',
  width: '100%',
});

export default function Signin() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const breakpoint = useMediaQuery(theme.breakpoints.up('sm'));

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [disable, setDisable] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful && !showError) {
      reset();
    }
  }, [isSubmitSuccessful, reset, showError]);

  const onSubmit = async (values) => {
    try {
      await sleep(2000);

      const status = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (status.error === null) {
        setShowError(false);
      } else {
        setShowError(true);
        throw new Error(`${status.error}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const [showPassword, setShow] = useState(false);

  const handleClickShowPassword = () => {
    setShow(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Google Handler function
  async function handleGoogleSignIn() {
    signIn('google', { callbackUrl: '/welcome' });
    setDisable(true);
  }
  // GitHub Handler function
  async function handleGitHubSignIn() {
    signIn('github', { callbackUrl: '/welcome' });
    setDisable(true);
  }

  return (
    <Layout>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 5,
        }}
      >
        <StyledForm autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Tooltip title="Touring logo" arrow>
              <MUILink component={Link} href="/">
                <Image
                  src={`/assets/touring-${isDarkMode ? 'light' : 'dark'}.svg`}
                  alt="Touring logo"
                  width={85}
                  height={25}
                  priority
                />
              </MUILink>
            </Tooltip>
          </Box>

          <Typography variant="h4" sx={{ my: 3 }}>
            Log in
          </Typography>

          <Grid
            container
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Grid item xs={12} sm={5} md={5} lg={5}>
              {showError && (
                <ErrorBox>
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <ErrorIcon sx={{ mr: 0.5, width: 24, height: 24 }} />{' '}
                    {errorMessage}
                  </Typography>
                </ErrorBox>
              )}

              <TextField
                id="email"
                className="email"
                name="email"
                label="Email address"
                error={Boolean(errors.email)}
                {...register('email')}
              />

              <Typography variant="body2" color="error">
                {errors.email?.message}
              </Typography>

              <TextField
                id="password"
                className="password"
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

              <Button
                variant="contained"
                type="submit"
                disabled={disable || isSubmitting}
                sx={{ my: 2, bgcolor: '#1976d2', width: '100%' }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: '#fff' }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} sx={{ display: 'flex' }} />
                  ) : (
                    'Log in'
                  )}
                </Typography>
              </Button>

              <Typography variant="body2" align="right">
                <NextLink href="/" passHref>
                  <a className="forgot-password">Forgot password?</a>
                </NextLink>
              </Typography>
            </Grid>

            {breakpoint ? (
              <Box>
                <Divider
                  orientation="vertical"
                  textAlign="center"
                  sx={{ mx: 2 }}
                >
                  <Chip label="OR" />
                </Divider>
              </Box>
            ) : (
              <Box sx={{ width: '100%' }}>
                <Divider
                  orientation="horizontal"
                  textAlign="center"
                  sx={{ my: 2 }}
                >
                  <Chip label="OR" />
                </Divider>
              </Box>
            )}

            <Grid item xs={12} sm={5} md={5} lg={5}>
              <ProviderButton
                onClick={handleGoogleSignIn}
                disabled={disable || isSubmitting}
              >
                <Box sx={{ display: 'flex' }}>
                  <Image
                    src="/assets/google.svg"
                    alt="Google icon"
                    width={32}
                    height={32}
                    quality={100}
                    priority
                  />
                </Box>
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Log in with Google
                </Typography>
              </ProviderButton>
              <ProviderButton
                onClick={handleGitHubSignIn}
                disabled={disable || isSubmitting}
              >
                <Box sx={{ display: 'flex' }}>
                  <Image
                    src={`/assets/github-${
                      theme.palette.mode === 'dark' ? 'light' : 'dark'
                    }.svg`}
                    alt="Github icon"
                    width={34}
                    height={34}
                    quality={100}
                    priority
                  />
                </Box>
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Log in with GitHub
                </Typography>
              </ProviderButton>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" align="right">
              Don&apos;t have an account?{' '}
              <NextLink href="/signup" passHref>
                <a className="signup-text">Sign up</a>
              </NextLink>
            </Typography>
          </Box>
        </StyledForm>
      </Container>
    </Layout>
  );
}
