import { Skeleton, Avatar } from '@mui/material';

export default function NavSkeleton() {
  return (
    <>
      <Skeleton variant="circular">
        <Avatar />
      </Skeleton>
    </>
  );
}
