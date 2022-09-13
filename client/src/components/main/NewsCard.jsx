import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './NewBlog.css';
import { Box } from '@mui/system';

export default function NewsCard({ news }) {
  const {
    text, text2, title, title1
  } = news;
  return (
    <Box className="box2">
      <Box
        sx={{
          backgroundColor: '#07070563!important',
          borderRadius: '25px',
          marginLeft: 'auto',
          margin: '10px',
          width: '120%',
          height: '60%'
        }}
      >
        <Typography component="legend" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ color: 'azure' }} gutterBottom variant="h5" component="div">
            {text}
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          backgroundColor: '#07070563 !important',
          borderRadius: '25px',
          margin: '10px',
          marginLeft: 'auto',
          width: '120%',
          height: '50%'
        }}
      >
        <Typography component="legend" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title1}
          </Typography>
          <Typography sx={{ color: 'azure' }} gutterBottom variant="h5" component="div">
            {text2}
          </Typography>
        </CardContent>
      </Box>
    </Box>
  );
}
