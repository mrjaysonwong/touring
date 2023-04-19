import Link from 'next/link';
import { styled } from '@mui/system';
import { Breadcrumbs, Typography } from '@mui/material';

const StyledLink = styled(Typography)({
  cursor: 'pointer',
  fontWeight: '500',
});

export default function NavBreadcrumbs({ pathArray, fullPath }) {
  const secondPath = `/dashboard/${pathArray[1]}`;

  const breadcrumbs = pathArray.map((path, idx) => {
    const styledPath = path.charAt(0).toUpperCase() + path.slice(1);
    const isLast = idx === pathArray.length - 1;

    const href = `/${pathArray.slice(0, idx + 1).join('/')}`;

    return isLast ? (
      <StyledLink key={href} variant="body2" color="var(--secondaryColor)">
        {styledPath}
      </StyledLink>
    ) : (
      <Link href={href === secondPath ? fullPath : href} key={href}>
        <StyledLink variant="body2">
          <a>{styledPath}</a>
        </StyledLink>
      </Link>
    );
  });

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator="›"
        sx={{ fontSize: '1.5rem' }}
      >
        {breadcrumbs}
      </Breadcrumbs>
    </>
  );
}
