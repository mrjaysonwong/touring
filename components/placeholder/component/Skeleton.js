import { styled } from '@mui/system';
import { Typography, Skeleton as MUISkeleton } from '@mui/material';

const variantOne = ['1', '2'];
const variantTwo = ['1'];
const variantThree = ['1'];

const StyledSkeleton = styled(MUISkeleton)({
  margin: '8px 0',
  height: '40px',
});

export default function Skeleton(props) {
  const { loading = false } = props;

  return (
    <>
      <div>
        {variantOne.map((variant) => (
          <Typography component="div" key={variant} variant={variant}>
            {loading ? <StyledSkeleton animation="wave" /> : variant}
          </Typography>
        ))}
        {variantTwo.map((variant) => (
          <Typography component="div" key={variant} variant={variant}>
            {loading ? (
              <StyledSkeleton animation="wave" width="50%" />
            ) : (
              variant
            )}
          </Typography>
        ))}
        {variantThree.map((variant) => (
          <Typography component="div" key={variant} variant={variant}>
            {loading ? (
              <StyledSkeleton animation="wave" width="80%" />
            ) : (
              variant
            )}
          </Typography>
        ))}
      </div>
    </>
  );
}
