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
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error';
import { sleep } from '@utils/common/Sleep';

const StyledForm = styled('form')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1.2rem',
  borderRadius: 8,
  boxShadow:
    'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.4) 0px 0px 0px 1px inset',
  '.signup-text, .forgot-password': {
    color: '#13a1ff',
  },
});

const ErrorBox = styled(Box)({
  backgroundColor: '#ffebed',
  border: '2px solid #fc3d31',
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '3px',
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

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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
        // redirect: false for same page error handling
        window.location.replace('/welcome');
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
  }
  // GitHub Handler function
  async function handleGitHubSignIn() {
    signIn('github', { callbackUrl: '/welcome' });
  }

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
          <StyledForm autoComplete="off">
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
              Log in
            </Typography>

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
                {isSubmitting ? (
                  <CircularProgress size={24} sx={{ display: 'flex' }} />
                ) : (
                  'Log in'
                )}
              </Typography>
            </Button>

            <Typography variant="h6">
              <Divider sx={{ m: 1 }}>or</Divider>
            </Typography>

            <ProviderButton
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
            <Divider
              sx={{ border: '1px thin', borderColor: '#aaaaaa', my: 2 }}
            />

            <Typography variant="body2" align="right">
              <NextLink href="/" passHref>
                <a className="forgot-password">Forgot password?</a>
              </NextLink>
            </Typography>
            <br />
            <Typography variant="body2" align="right">
              Don&apos;t have an account?{' '}
              <NextLink href="/signup" passHref>
                <a className="signup-text">Sign up</a>
              </NextLink>
            </Typography>
          </StyledForm>
        </Container>
      </Layout>
    </>
  );
}
