import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import {
  Avatar, Box
} from '@mui/material';
import { useState } from 'react';
import ButtonLKDel from './ButtonLKDel';
// import './ItemUser.css';
// import ButtonDel from '../buttonDel/ButtonDel';

export default function LocationItem({ elem, onClickLoc }) {
  return (
    <Box sx={{
      backgroundColor: '#f8f9fa24',
      borderRadius: '25px',
      margin: '10px'

    }}
    >

      <CardContent sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', backgroundColor: '#282b18d1', borderRadius: '14px'
      }}
      >
        <CardHeader
          sx={{
            color: 'azure'
          }}
          avatar={(
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          )}
        />
        <Typography gutterBottom variant="h5" component="div">
          <h4>{elem.name}</h4>
        </Typography>
        <ButtonLKDel elem={elem} onClickDel={onClickLoc} />
      </CardContent>
    </Box>
  );
}
