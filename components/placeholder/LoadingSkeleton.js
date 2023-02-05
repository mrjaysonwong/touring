import Grid from '@mui/material/Grid';
import Skeleton from './component/Skeleton';

export const LoadSkeleton = (props) => {
  return (
    <>
      <Grid container spacing={8}>
        <Grid item xs>
          <Skeleton loading={props} />
          <br />
          <Skeleton loading={props} />
        </Grid>
      </Grid>
    </>
  );
};
