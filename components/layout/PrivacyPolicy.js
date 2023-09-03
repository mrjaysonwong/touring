import { useState, useEffect, useRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';


export default function PrivacyPolicy() {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [text, setText] = useState('');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  let fetchData = async () => {
    let res = await axios.get(`/privacy-policy.txt`);
    let data = await res.data;
    const format = data.split('\n').map((str, idx) => <p key={idx}>{str}</p>);
    setText(format);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Button
        onClick={handleClickOpen('paper')}
        color="inherit"
        sx={{
          '&:hover': {
            bgcolor: 'transparent',
            textDecoration: 'underline',
          },
          textTransform: 'initial',
        }}
      >
        Privacy Policy
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Privacy Policy</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            component="div"
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
