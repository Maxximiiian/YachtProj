import { Avatar, Box, IconButton } from '@mui/material';
import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import './PrivatePost.css';

export default function PrivatePost({ post }) {
  const {
    title, body, locationId, userId, wayId
  } = post;
  return (
    <Box
      className="box"
      sx={{
        backgroundColor: '#070705bd !important',
        borderRadius: '25px',
        margin: '10px',
        marginLeft: 'auto'
      }}
    >
      <Typography component="legend" />
      <CardHeader
        sx={{
          color: 'azure'
        }}
        avatar={(
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src="avatar.jpg">
            R
          </Avatar>
          )}
        action={(
          <IconButton aria-label="settings" />
          )}
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography sx={{ color: 'azure' }} gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ color: 'azure' }} variant="body2">
          {body}
        </Typography>
        <Typography sx={{ color: 'azure' }} variant="body2">
          {locationId}
        </Typography>
        <Typography sx={{ color: 'azure' }} variant="body2">
          {userId}
        </Typography>
        <Typography sx={{ color: 'azure' }} variant="body2">
          {wayId}
        </Typography>
      </CardContent>
    </Box>
  );
}
