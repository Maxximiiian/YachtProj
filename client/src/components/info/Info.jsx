import { Box } from '@mui/material';
import React, { useState } from 'react';
import ButtonForm from './ButtonForm';
import ConectionForm from './ConectionForm';
import ButtonCend from './ButtonCend';
// #282b186b
import './Info.css';

export default function Info() {
  const [viewFormState, setViewFormState] = useState(false);
  const onClickBut = () => {
    setViewFormState(!viewFormState);
  };
  return (
    <Box
      sx={{
        width: '50%',
        display: 'flex',
        flexFlow: 'column',
        gap: 6,
        margin: '10rem auto',
        backgroundColor: '#282b186b',
        borderRadius: '24px'

      }}
    >
      <div className="about">
        <h1>О нас</h1>
        <div className="info">
          много текста
        </div>
      </div>
      <ButtonForm onClickBut={onClickBut} />

      {viewFormState ? (
        <div>

          <ConectionForm />
          {/* <ButtonCend /> */}
        </div>

      ) : (null)}
    </Box>
  );
}
