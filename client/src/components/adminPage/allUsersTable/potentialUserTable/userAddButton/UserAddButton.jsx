import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export default function UserAddButton({ elem, delPotentialAddUser }) {
  console.log(elem, '==========');
  return (
    <IconButton onClick={() => delPotentialAddUser(elem.id, elem)} style={{ color: 'white' }} size="large">
      <GroupAddIcon />
    </IconButton>

  );
}
