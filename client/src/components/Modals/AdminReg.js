import React, { useState } from 'react';
import {
  Box, Button, Container, Divider, List, MenuItem, OutlinedInput, TextField,
  makeStyles
} from '@mui/material';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { MuiTelInput } from 'mui-tel-input';
import { useDispatch } from 'react-redux';

export default function AdminReg() {
  // e.target.name === 'admin' ? inpState.admin :
// import { useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
//   const [personName, setPersonName] = useState([]);
  const dispatch = useDispatch();
  const [phoneValue, setPhoneValue] = useState('+79');
  const [inpState, setInpState] = useState({ admin: [] });
  const inpHandler = (e) => setInpState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const phoneChange = (newValue) => {
    setPhoneValue(newValue);
    setInpState((prev) => ({ ...prev, phone: phoneValue }));
  };
  const adminRegistration = async (e) => {
    e.preventDefault();
    // if (inpState.admin[0] === 'Администратор') {
    //   setInpState((prev) => ({ ...prev, adminInBack: true }));
    // } else {
    //   setInpState((prev) => ({ ...prev, adminInBack: false }));
    // }
    // console.log('state', inpState);
    // let sendInp = {};
    // if (inpState.phone === '') {
    //   sendInp = { ...inpState, phone: phoneValue };
    //   console.log(sendInp);
    //   if (inpState.admin[0] === 'Администратор') {
    //     sendInp = { ...inpState, admin: true };
    //   }
    //   if (inpState.admin[0] === 'Пользователь') {
    //     sendInp = { ...inpState, admin: false };
    //   }
    // }
    console.log(inpState);
    const response = await fetch('http://localhost:3002/adminRegistration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(inpState)
    });
    if (response.ok) {
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
  //   const handleChange = (event) => {
  //     const {
  //       target: { value }
  //     } = event;
  //     setPersonName(
  //       // On autofill we get a stringified value.
  //       value
  //     );
  //   };
  //   console.log('!!!!', personName);

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

  //   const phoneInput = (props, ref) => {
  //     const classes = useStyles();

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: 7,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
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
            sx={{ '& > :not(style)': { m: 1, width: '95%' } }}
            noValidate
            autoComplete="off"
          >
            <TextField name="name" onChange={inpHandler} className="TextField" id="outlined-basic" label="Имя пользователя" variant="outlined" size="small" />
            <TextField name="email" onChange={inpHandler} className="TextField" id="outlined-basic" label="Электронная почта" variant="outlined" size="small" />
            <MuiTelInput name="phone" value={phoneValue} onChange={phoneChange} />
            <TextField type="password" onChange={inpHandler} name="password" className="TextField" id="outlined-basic" label="Пароль" variant="outlined" size="small" />
            <TextField type="password" onChange={inpHandler} name="repeatPassword" className="TextField" id="outlined-basic" label="Повторите пароль" variant="outlined" size="small" />
            <div>
              <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                <Select
                  multiple
                  displayEmpty
                  name="admin"
                  value={inpState.admin}
                  onChange={inpHandler}
                  input={<OutlinedInput />}
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
                    //   style={getStyles(name, personName)}
                    >
                      {el.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Button className="buttonEdit" onClick={adminRegistration} variant="outlined">Войти</Button>
          </Box>
        </List>
      </Box>
      {' '}
    </Container>
  );
}

