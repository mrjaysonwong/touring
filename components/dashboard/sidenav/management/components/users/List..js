import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@components/dashboard/layout/Layout';
import { styled } from '@mui/system';
import { Typography, Box, Avatar, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ActionButtons from './components/ActionButtons';
import NavBreadcrumbs from '@components/dashboard/layout/NavBreadcrumbs';
import AddUser from './components/add-user/AddUser';

function MyGridToolbar(props) {
  return (
    <GridToolbar
      {...props}
      showQuickFilter
      quickFilterProps={{
        debounceMs: 250,
        placeholder: 'Search Record/s...',
      }}
      sx={{
        my: 2,
        ml: 2,
      }}
    />
  );
}

const Wrapper = styled(Box)({
  '& .MuiDataGrid-root .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  '& .MuiDataGrid-columnHeaderTitle, .MuiDataGrid-cellContent': {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
});

export default function UserListDashBoard({ data }) {
  const [pageSize, setPageSize] = useState(5);
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const router = useRouter();
  const pathArray = router.pathname.split('/').filter((x) => x);

  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    {
      field: 'userName',
      headerName: 'User name',
      width: 160,
      renderCell: (params) => (
        <>
          <Box>
            {params.row.image ? (
              <Avatar sx={{ bgcolor: 'transparent' }}>
                <Image
                  src={params.row.image}
                  height={40}
                  width={40}
                  quality={90}
                  priority
                  alt="Profile Photo"
                  referrerPolicy="no-referrer"
                />
              </Avatar>
            ) : (
              <Avatar />
            )}
          </Box>
          <Box sx={{ ml: 1 }}>
            {params.row.firstName || ''} {params.row.lastName || ''}
          </Box>
        </>
      ),
    },
    { field: 'email', headerName: 'Email', width: 220 },

    {
      field: 'phone',
      headerName: 'Phone',
      type: 'string',
      width: 120,
    },
    {
      field: 'country',
      headerName: 'Hometown',
      type: 'string',
      width: 200,
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'string',
      width: 100,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'string',
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => <ActionButtons />,
    },
  ];

  const rows = data.result.map((user) => {
    const areaCode = user.phone.areaCode.split(' ');
    const phoneNumber = user.phone.phoneNumber;

    return {
      id: user._id,
      userName: `${user.firstName} ${user.lastName}`,
      image: user.image,
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
      phone: user.phone.phoneNumber ? `${areaCode[0]} ${phoneNumber}` : null,
      country: user.homeTown ? user.homeTown : null,
      role: user.role,
    };
  });

  return (
    <Layout>
      <Wrapper>
        <NavBreadcrumbs pathArray={pathArray} fullPath={router.pathname} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 5,
            mt: 2,
          }}
        >
          <Typography variant="h5">Users</Typography>
          <AddUser />
        </Box>

        <Box
          sx={{
            height: 550,
            width: '100%',
          }}
        >
          <DataGrid
            rows={rows}
            rowHeight={70}
            columns={columns}
            onPageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            components={{ Toolbar: MyGridToolbar }}
            sx={{
              bgcolor: isDarkMode ? 'rgba(66, 66, 66, 0.2)' : '',
              border: isDarkMode ? 'none' : '1px thin',
            }}
          />
        </Box>
      </Wrapper>
    </Layout>
  );
}
