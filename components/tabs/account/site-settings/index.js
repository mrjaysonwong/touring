import Typography  from '@mui/material/Typography';
import SiteLanguage from './components/SiteLanguage';
import Currency from './components/Currency';

export default function SiteSettings() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Site Settings
      </Typography>

      <SiteLanguage />
      <Currency />
    </>
  );
}
