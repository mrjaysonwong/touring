import { useState, useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';

export default function LinearDeterminate() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 80;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box sx={{ width: '100%', position: 'absolute', zIndex: 5}}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
