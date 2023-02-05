import Typography from '@mui/material/Typography';
import Language from './components/Language';
import SpecialRequirements from './components/SpecialRequirements';

export default function TravelPreferences() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Travel Preferences
      </Typography>

      <Language />
      <SpecialRequirements />
    </>
  );
}
