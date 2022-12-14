import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import {
  Avatar, Box
} from '@mui/material';
import './ItemUser.css';
import ButtonDel from '../buttonDel/ButtonDel';

export default function ItemUser({ elem, DelUser }) {
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
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src="" />
          )}
        />
        <Typography gutterBottom variant="h5" component="div">
          <h4>{elem.name}</h4>
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          <h6>{elem.email}</h6>
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          <h6>{elem.admin}</h6>
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          <h6>{elem.phone}</h6>
        </Typography>
        <ButtonDel DelUser={DelUser} elem={elem} />
      </CardContent>
    </Box>
  );
}
