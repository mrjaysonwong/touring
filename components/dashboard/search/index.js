import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import ClickAwayListener from '@mui/base/ClickAwayListener';

const SearchBox = styled(Box)(({ open, darkmode }) => ({
  width: '200%',
  height: '100%',
  position: 'absolute',
  marginLeft: '-24px',
  zIndex: 1,
  backgroundColor:
    darkmode === 'true' ? 'rgba(22, 28, 36, 0.5)' : 'rgba(245, 245, 245, 0.5)',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  alignItems: 'center',
  top: open ? '0px' : '-150px',
  transition: 'all 2s ease',
}));

export default function Searchbar({ darkmode }) {
  const [open, setOpen] = useState(false);

  const handleClickSearch = () => {
    setOpen(!open);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <>
      <SearchIcon
        onClick={handleClickSearch}
        sx={{ cursor: 'pointer', display: open ? 'none' : 'block' }}
      />

      {open ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <SearchBox open={open} darkmode={`${darkmode}`}>
            <TextField
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ ml: 2 }}
              size="small"
            />
          </SearchBox>
        </ClickAwayListener>
      ) : null}
    </>
  );
}
