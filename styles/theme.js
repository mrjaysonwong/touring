import { darkTheme, lightTheme } from '@utils/common/ThemeProvider';

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
