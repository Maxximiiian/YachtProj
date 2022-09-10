import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { display } from '@mui/system';
import { useState } from 'react';

const ariaLabel = { 'aria-label': 'description' };
export default function ConectionForm() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': {
          mt: 3, top: '75%', display: 'flex', flexDirection: 'column', color: 'white', backgroundColor: '#282b186b', borderRadius: '5px', padding: '10px '
        }
      }}
      noValidate
      autoComplete="off"
    >
      <Input type="text" name="name" value={inputOne} onChange={(event) => setInputOne(event.target.value)} placeholder="Имя" inputProps={ariaLabel} />
      <Input type="text" name="phone" value={inputTwo} onChange={(event) => setInputTwo(event.target.value)} placeholder="Телефон" inputProps={ariaLabel} />
      <Input type="text" name="email" value={inputThree} onChange={(event) => setInputThree(event.target.value)} placeholder="e-mail" inputProps={ariaLabel} />
      <Input type="text" name="about" value={inputFour} onChange={(event) => setInputFour(event.target.value)} placeholder="Прочая информация" inputProps={ariaLabel} />
    </Box>
  );
}
