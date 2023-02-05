import Typography from '@mui/material/Typography';
import Cards from './components/Cards';

export default function Payment() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Payment Method
      </Typography>

      <Cards />
    </>
  );
}
