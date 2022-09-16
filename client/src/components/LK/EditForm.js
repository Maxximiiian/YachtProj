import {
  Box, Button, CircularProgress, Divider, IconButton, List, TextField
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import React, { useCallback, useEffect, useState } from 'react';
import './editForm.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUserPhoto, getUserPhoto, getUserPhotoThunk } from '../../redux/actions/photoActions';
import { userInfoChange_THUNK } from '../../redux/actions/authActions';

export default function EditForm() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // useEffect(() => {
  //   dispatch(getUserPhotoThunk(auth.id));
  // }, []);
  const photoUser = useSelector((state) => state.photoUser);

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

  // console.log('inputi', inpStateUserInfo, inpStateUserPhoto);

  const changeHandler = () => {
    dispatch(userInfoChange_THUNK(inpStateUserInfo));
    // dispatch(userPhotoChange_THUNK(inpStateUserPhoto));
  };
  console.log('posle knopki foto', inpStateUserPhoto);
  const sendFile = useCallback(async () => {
    try {
      const data = new FormData();
      data.append('avatar', inpStateUserPhoto.image);
      console.log(data, 'data na fr');
      await fetch('api/v1/photo/changePhoto', {
        method: 'post',
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // },
        credentials: 'include',
        body: data
      }).then((res) => res.json())
        .then((res) => {
          dispatch(addUserPhoto(res));
        });
      // axios.post('api/v1/photo/changePhoto', data, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
    } catch (error) {
      console.error(error);
    }
  }, [inpStateUserPhoto]);

  return (
    <Box
      sx={{
        height: '100%', MarginTop: '50px'
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
          <Button className="buttonEdit" onClick={changeHandler} variant="outlined">Изменить данные</Button>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input
              hidden
              accept="image/*"
              type="file"
              // onChange={(e) => setInpStateUserPhoto({ imageimage: e.target.files[0] })}
              onChange={(e) => setInpStateUserPhoto({ image: e.target.files[0] })}

            />
            <PhotoCamera />
          </IconButton>
          <Button variant="contained" component="label" onClick={sendFile}>
            Измените фотографию
          </Button>
          {/* <CircularProgress /> */}
        </Box>
      </List>
    </Box>
  );
}

// {auth.name} variant="outlined" size="small" />
//           <TextField className="TextField" id="outlined-basic"
// label={auth.phone} variant="outlined" size="small" />
//           <TextField className="TextField" id="outlined-basic" label={auth.email}
