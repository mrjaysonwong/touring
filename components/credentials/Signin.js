import { useEffect, useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useTheme } from '@mui/material/styles';
import { Link } from 'helpers/utils/common/Link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from 'helpers/yup/credentials/CredentialsSchema';
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
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error';
import { sleep } from 'helpers/utils/common/Sleep';

const StyledForm = styled('form')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1.2rem',
  borderRadius: 8,
  boxShadow:
    'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.4) 0px 0px 0px 1px inset',
  '.signup-text': {
    color: '#13a1ff',
  },
  '.error-box': {
    backgroundColor: '#ffebed',
    border: '2px solid #fc3d31',
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    borderRadius: '3px',
  },
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
  const themeMode = theme.palette.mode;

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
    await sleep(1000);

    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/',
    });

    if (status.error === null) {
      setShowError(false);
    } else {
      setShowError(true);
      setErrorMessage(status.error);
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
    /** DEVELOPMENT */
    // signIn('google', { callbackUrl: 'http://localhost:3000' });
    /** PRODUCTION */
    signIn('google', { callbackUrl: 'https://touring.vercel.app' });
  }
  // GitHub Handler function
  async function handleGitHubSignIn() {
    /** DEVELOPMENT */
    // signIn('github', { callbackUrl: 'http://localhost:3000' });
    /** PRODUCTION */
    signIn('github', { callbackUrl: 'https://touring.vercel.app' });
  }

  return (
    <>
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
                    themeMode === 'dark' ? 'light' : 'dark'
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
            <Box className="error-box">
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
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#fff' }}>
              Log in
            </Typography>
          </Button>

          <Typography variant="h6">
            <Divider sx={{ m: 1 }}>or</Divider>
          </Typography>

          <ProviderButton onClick={handleGoogleSignIn}>
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
          <ProviderButton onClick={handleGitHubSignIn}>
            <Box sx={{ display: 'flex' }}>
              <Image
                src={`/assets/github-${
                  themeMode === 'dark' ? 'light' : 'dark'
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
          <Divider sx={{ border: '1px thin', borderColor: '#aaaaaa', my: 2 }} />

          <Typography variant="body2" align="right">
            Don&apos;t have an account?{' '}
            <NextLink href="/signup" passHref>
              <a className="signup-text">Sign up</a>
            </NextLink>
          </Typography>
        </StyledForm>
      </Container>
    </>
  );
}
