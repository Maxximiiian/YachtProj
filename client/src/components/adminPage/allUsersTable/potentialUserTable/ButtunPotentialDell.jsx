import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ButtunPotentialDell({ elem, DelUser2 }) {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton onClick={() => DelUser2(elem.id)} id="buttondel" aria-label="delete" size="large" style={{ color: 'white' }}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
