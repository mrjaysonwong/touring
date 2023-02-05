import Typography from '@mui/material/Typography';
import Fullname from './components/Fullname';
import Email from './components/Email';
import Phone from './components/Phone';
import DateOfBirth from './components/DateOfBirth';
import HomeTown from './components/HomeTown';

export default function Personal() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Personal Information
      </Typography>

      <Fullname />
      <Email />
      <Phone />
      <DateOfBirth />
      <HomeTown />
    </>
  );
}
