import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export default function UserAboutButton({ elem, DelUser2, onClickAbout }) {
  return (
    <IconButton onClick={onClickAbout} style={{ color: 'white' }} id="buttadduser" size="large">
      <PersonSearchIcon />
    </IconButton>

  );
}
