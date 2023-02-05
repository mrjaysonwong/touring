import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { CssBaseline, ThemeProvider, GlobalStyles } from '@mui/material';
import { darkTheme, globalStyles, lightTheme } from '../../src/theme/index';

const MUIThemeProvider = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  useEffect(() => {
    resolvedTheme === 'light'
      ? setCurrentTheme(lightTheme)
      : setCurrentTheme(darkTheme);
  }, [resolvedTheme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
