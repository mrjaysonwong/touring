import { forwardRef } from 'react';
import NextLink from 'next/link';
import { Link as MUILink } from '@mui/material';

export const Link = forwardRef((props, ref) => {
  const { href } = props;
  return (
    <NextLink href={href} passHref>
      <MUILink ref={ref} {...props} />
    </NextLink>
  );
});

Link.displayName = 'CustomLink';
