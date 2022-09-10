import {
  Box, Button, Divider, List, TextField
} from '@mui/material';
import React from 'react';
import './editForm.css';

export default function EditForm() {
  return (
    <Box
      sx={{
        height: '100%', margin: '15px'
      }}
      role="presentation"
      className="editForm"
    >
      <List sx={{ paddingLeft: '40px', color: '#F0FFFF' }}>Вход для участников</List>
      <Divider />
      <List>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '90%' } }}
          noValidate
          autoComplete="off"
        >
          <TextField className="TextField" id="outlined-basic" label="Измените имя" variant="outlined" size="small" />
          <TextField className="TextField" id="outlined-basic" label="Измените ваш номер" variant="outlined" size="small" />

          <TextField className="TextField" id="outlined-basic" label="Добавьте ссылку на фотографию" variant="outlined" size="small" />
          <Button variant="contained" component="label">
            Загрузите фотографию
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <Button className="buttonEdit" variant="outlined" href="/main">Войти</Button>
        </Box>
      </List>
    </Box>
  );
}
