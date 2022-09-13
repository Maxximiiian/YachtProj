import {
  Box, Button, Divider, List, TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './editForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPhotoThunk, userPhotoChange_THUNK } from '../../redux/actions/photoActions';
import { userInfoChange_THUNK } from '../../redux/actions/authActions';

export default function EditForm() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  // useEffect(() => {
  //   dispatch(getUserPhotoThunk(auth.id));
  // }, []);
  const { photoUser } = useSelector((state) => state);

  // console.log('photo', photoUser);

  const [inpStateUserInfo, setInpStateUserInfo] = useState({
    name: auth.name,
    phone: auth.phone,
    email: auth.email

  });
  const [inpStateUserPhoto, setInpStateUserPhoto] = useState({

    image: photoUser?.image
  });
  const inpHandlerUserInfo = (e) => setInpStateUserInfo(
    (prev) => ({ ...prev, [e.target.name]: e.target.value })
  );
  const inpHandlerUserPhoto = (e) => setInpStateUserPhoto(
    (prev) => ({ ...prev, [e.target.name]: e.target.value })
  );

  // console.log('inputi', inpStateUserInfo, inpStateUserPhoto);

  const changeHandler = () => {
    dispatch(userInfoChange_THUNK(inpStateUserInfo));
    dispatch(userPhotoChange_THUNK(inpStateUserPhoto));
  };

  return (
    <Box
      sx={{
        height: '100%', margin: '15px'
      }}
      role="presentation"
      className="editForm"
    >
      <List sx={{ paddingLeft: '40px', color: '#F0FFFF' }}>Измените свои данные</List>
      <Divider />
      <List>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '90%' } }}
          noValidate
          autoComplete="off"
        >
          <TextField name="name" className="TextField" id="outlined-basic" onChange={inpHandlerUserInfo} label={auth.name} variant="outlined" size="small" />
          <TextField name="phone" className="TextField" id="outlined-basic" onChange={inpHandlerUserInfo} label={auth.phone} variant="outlined" size="small" />
          <TextField name="email" className="TextField" id="outlined-basic" onChange={inpHandlerUserInfo} label={auth.email} variant="outlined" size="small" />

          <TextField name="image" className="TextField" id="outlined-basic" onChange={inpHandlerUserPhoto} label={photoUser?.image || 'Ссылка на Вашу фотографию'} variant="outlined" size="small" />
          <Button variant="contained" component="label">
            Загрузите фотографию
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <Button className="buttonEdit" onClick={changeHandler} variant="outlined">Изменить</Button>
        </Box>
      </List>
    </Box>
  );
}

// {auth.name} variant="outlined" size="small" />
//           <TextField className="TextField" id="outlined-basic"
// label={auth.phone} variant="outlined" size="small" />
//           <TextField className="TextField" id="outlined-basic" label={auth.email}
