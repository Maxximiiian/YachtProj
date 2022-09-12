import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export default function UserAddButton({ elem, DelUser2 }) {
  return (
    <IconButton style={{ color: 'white' }} id="buttadduser" size="large">
      <GroupAddIcon />
    </IconButton>

  );
}
