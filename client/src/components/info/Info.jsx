import { Box } from '@mui/material';
import React from 'react';
import ButtonForm from './ButtonForm';
import ConectionForm from './ConectionForm';
import ButtonCend from './ButtonCend';

import './Info.css';

export default function Info() {
  const onClickBut = () => {
    console.log('oiiiiiiiiiiiiiii');
  };
  return (
    <Box sx={{
      width: '50%', display: 'flex', flexFlow: 'column', color: 'white', gap: 6, margin: '10rem auto'
    }}
    >
      <div className="about">
        <div><h1>О нас</h1></div>
        <div className="info">
          много текста
        </div>
      </div>
      <ButtonForm onClickBut={onClickBut} />
      <ConectionForm />
      <ButtonCend />
    </Box>
  );
}
