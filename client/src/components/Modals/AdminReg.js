import React, { useState } from 'react';
import {
  Box, Button, Container, Divider, List, MenuItem, OutlinedInput, TextField

} from '@mui/material';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { MuiTelInput } from 'mui-tel-input';
import zIndex from '@mui/material/styles/zIndex';
import { useDispatch } from 'react-redux';
import { SET_SHOW_FORM } from '../../redux/types/types';

export default function AdminReg({ delPotentialAddUser }) {
  // const dispatch = useDispadispatchtch();
  const [phoneValue, setPhoneValue] = useState('+79');
  const [inpState, setInpState] = useState({ admin: [] });
  const inpHandler = (e) => setInpState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const dispatch = useDispatch();
  const phoneChange = (newValue) => {
    setPhoneValue(newValue);
    setInpState((prev) => ({ ...prev, phone: phoneValue }));
  };
  const clickShowForm = () => {
    dispatch({ type: SET_SHOW_FORM });
  };
  const adminRegistration = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3002/adminRegistration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(inpState)
    });
    if (response.ok) {
      // delPotentialAddUser();
      clickShowForm();

      //   const data = await response.json();

    //   dispatch(setAuth(data));
    //   navigate('/');
    } else {
      alert('Такой пользователь уже существует');
      setInpState({
        name: '', phone: '', email: '', password: '', admin: []
      });
    }
  };

  const ITEM_HEIGHT = 35;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  const status = [
    {
      name: 'Пользователь',
      status: false
    },
    {
      name: 'Администратор',
      status: true
    }

  ];

  return (
    <div>
      <div
        className="background"
        style={{
          width: '100%',
          height: '220%',
          backdropFilter: 'blur(2.2px)',
          backgroundColor: 'rgb(30 33 47 / 36%)',
          position: 'absolute',
          left: '0%',
          top: '9%'

        }}
      />
      <Container
        maxWidth="sm"
        sx={{
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          left: '-80%',
          top: '-70%'
        }}
      >
        <Box
          sx={{
            height: '100%', margin: '15px'
          }}
          role="presentation"
          className="editForm"
        >
          <List sx={{ paddingLeft: '41px', color: '#F0FFFF' }}>Регистрация пользователя</List>
          <Divider />
          <List>
            <Box
              component="form"
              sx={{ '& > :not(style)': { m: 1, width: '95%' } }}
              noValidate
              autoComplete="off"
            >
              <TextField name="name" onChange={inpHandler} className="TextField" id="outlined-basic" label="Имя пользователя" variant="outlined" size="small" />
              <TextField name="email" onChange={inpHandler} className="TextField" id="outlined-basic" label="Электронная почта" variant="outlined" size="small" />
              <MuiTelInput name="phone" className="TextField" value={phoneValue} onChange={phoneChange} />
              <TextField type="password" onChange={inpHandler} name="password" className="TextField" id="outlined-basic" label="Пароль" variant="outlined" size="small" />
              <TextField type="password" onChange={inpHandler} name="repeatPassword" className="TextField" id="outlined-basic" label="Повторите пароль" variant="outlined" size="small" />
              <div>
                <FormControl sx={{
                  m: 1, width: 300, mt: 3
                }}
                >
                  <Select
                    multiple
                    displayEmpty
                    name="admin"
                    value={inpState.admin}
                    onChange={inpHandler}
                    input={<OutlinedInput className="TextField" />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Статус</em>;
                      }

                      return selected;
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >

                    {status.map((el) => (
                      <MenuItem
                        key={el.id}
                        value={el.name}
                      >
                        {el.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <Button className="buttonEdit" onClick={adminRegistration} variant="outlined">Зарегистрировать</Button>
            </Box>
          </List>
        </Box>
        {' '}
      </Container>
    </div>

  );
}
