import { useEffect, useState, useContext, useMemo, useRef } from 'react';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import ColorModeContext from '../../contexts/colorModeContext';
import GetDesignTokens from '../../styles/theme';
import { ThemeMode } from '../../pages/_app';
import { Cookies, CookiesProvider, useCookies } from 'react-cookie';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  secondary: { main: '#f48638', contrastText: '#fff' },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  secondary: { main: '#f48638', contrastText: '#fff' },
});

export default function MuiThemeProvider({ children }) {
  const themeSetting = useContext(ThemeMode);

  const [mode, setMode] = useState(themeSetting || 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const [cookies, setCookie] = useCookies(['cookieColorMode']);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // checking if the environment is a browser or not
  const isBrowser = typeof window !== 'undefined';

  const addDays = (date, days) => {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  };

  useEffect(() => {
    if (prefersDarkMode && !!cookies.cookieColorMode !== true) {
      setMode('dark');
    }
  }, [prefersDarkMode, cookies.cookieColorMode]);

  // persist the value of firstUpdate across multiple renders, so that the value of firstUpdate will not be reset to its initial value of true after each render.
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const date = new Date();
    const expires = addDays(date, 365);

    // secure for https only
    setCookie('cookieColorMode', mode, { path: '/', expires, secure: true });
  }, [mode, setCookie]);

  useEffect(() => {
    const colorSetting = cookies.cookieColorMode;
    if (colorSetting) {
      setMode(colorSetting);
    }
  }, [cookies.cookieColorMode]);

  const theme = useMemo(() => createTheme(GetDesignTokens(mode)), [mode]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CookiesProvider
            cookies={isBrowser ? undefined : new Cookies(cookies)}
          >
            {children}
          </CookiesProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
