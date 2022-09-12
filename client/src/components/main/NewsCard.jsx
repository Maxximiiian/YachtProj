import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './NewBlog.css';
import { Box } from '@mui/system';

export default function NewsCard({ news }) {
  const { text } = news;
  return (
    <Box className="box2">
      <Box
        sx={{
          backgroundColor: '#070705bd !important',
          borderRadius: '25px',
          marginLeft: 'auto'
        }}
      >
        <Typography component="legend" />
        <CardContent>
          <Typography sx={{ color: 'azure' }} gutterBottom variant="h5" component="div">
            {text}
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          backgroundColor: '#070705bd !important',
          borderRadius: '25px',
          margin: '10px',
          marginLeft: 'auto'
        }}
      >
        <Typography component="legend" />
        <CardContent>
          <Typography sx={{ color: 'azure' }} gutterBottom variant="h5" component="div">
            {text}
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          backgroundColor: '#070705bd !important',
          borderRadius: '25px',
          margin: '10px',
          marginLeft: 'auto'
        }}
      >
        <Typography component="legend" />
        <CardContent>
          <Typography sx={{ color: 'azure' }} gutterBottom variant="h5" component="div">
            {text}
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          backgroundColor: '#070705bd !important',
          borderRadius: '25px',
          margin: '10px',
          marginLeft: 'auto'
        }}
      >
        <Typography component="legend" />
        <CardContent>
          <Typography sx={{ color: 'azure' }} gutterBottom variant="h5" component="div">
            {text}
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          backgroundColor: '#070705bd !important',
          borderRadius: '25px',
          margin: '10px',
          marginLeft: 'auto'
        }}
      >
        <Typography component="legend" />
        <CardContent>
          <Typography sx={{ color: 'azure' }} gutterBottom variant="h5" component="div">
            {text}
          </Typography>
        </CardContent>
      </Box>
    </Box>
  );
}
