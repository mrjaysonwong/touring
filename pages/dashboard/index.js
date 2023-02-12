import Head from 'next/head';
import { requireAuthentication } from '@utils/auth/RequireAuthentication';
import { styled } from '@mui/system';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  ListSubheader,
} from '@mui/material';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | Touring</title>
      </Head>
    </>
  );
}

export async function getServerSideProps(context) {
  return requireAuthentication(context, ({ session }) => {
    return {
      props: {
        session,
      },
    };
  });
}
