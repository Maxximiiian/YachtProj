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
          m: 1, top: '75%', display: 'flex', flexDirection: 'column', color: 'white'
        }
      }}
      noValidate
      autoComplete="off"
    >
      <Input defaultValue="Hello world" inputProps={ariaLabel} />
      <Input placeholder="Placeholder" inputProps={ariaLabel} />
      <Input disabled defaultValue="Disabled" inputProps={ariaLabel} />
      <Input defaultValue="Error" error inputProps={ariaLabel} />
    </Box>
  );
}
