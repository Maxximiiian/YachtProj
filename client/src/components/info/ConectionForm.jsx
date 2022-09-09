import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { display } from '@mui/system';

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
      <Input defaultValue="Имя" inputProps={ariaLabel} />
      <Input defaultValue="Телефон" inputProps={ariaLabel} />
      <Input defaultValue="e-mail" inputProps={ariaLabel} />
      <Input defaultValue="Прочая информация" inputProps={ariaLabel} />
    </Box>
  );
}
