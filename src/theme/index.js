import { createTheme, css } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    secondary: { main: '#f48638', contrastText: '#fff' },
    mode: 'light',
  },
  typography: {
    fontFamily: 'Poppins',
  },
});

export const darkTheme = createTheme({
  palette: {
    secondary: { main: '#f48638', contrastText: '#fff' },
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Poppins',
  },
});

export const globalStyles = css`
  :root {
    body {
      background-color: #fff;
      color: #121212;
    }
  }
  [data-theme='dark'] {
    body {
      background-color: #121212;
      color: #fff;
    }
  }
`;
