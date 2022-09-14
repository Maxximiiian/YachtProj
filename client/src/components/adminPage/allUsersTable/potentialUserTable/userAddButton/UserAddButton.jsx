import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useDispatch } from 'react-redux';
import { SET_SHOW_FORM } from '../../../../../redux/types/types';

export default function UserAddButton({ elem, delPotentialAddUser }) {
  console.log(elem, '==========');
  const dispatch = useDispatch();

  const clickShowForm = () => {
    dispatch({ type: SET_SHOW_FORM });
  };

  return (
    <IconButton
      onClick={() => {
        clickShowForm();
        delPotentialAddUser(elem.id, elem);
      }}
      style={{ color: 'white' }}
      size="large"
    >
      <GroupAddIcon />
    </IconButton>

  );
}
