import { darkTheme, lightTheme } from '@utils/theme/ThemeProvider';

const GetDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? darkTheme : lightTheme),
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default GetDesignTokens;
