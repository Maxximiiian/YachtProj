import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import './SideBarFormLogIn.css';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userSignInThunk } from '../../redux/actions/authActions';

export default function SideBarFormLogIn() {
  const [state, setState] = React.useState({ right: false });
  const [input, setInput] = React.useState({});
  const [error, setError] = React.useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event
      && event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userSignInThunk(input));
    setInput({});
    toggleDrawer(false);
    nav('/');
  };

  // onClick={() => setState((prev) => ({ ...prev, [anchor]: false }))}

  const list = (anchor) => (
    <Box
      sx={{
        maxWidth: 500,
        backgroundColor: '#282b186b !important',
        opacity: '0.8',
        boxShadow: 'none',
        height: '100%',
        color: 'azure'
      }}
      role="presentation"
    >
      <List sx={{ paddingLeft: '30%', color: 'burlywood', marginTop: '2rem' }}>Вход для участников</List>
      <Divider />
      <List>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          onSubmit={toggleDrawer(anchor, false)}
        >
          <TextField className="TextField" name="email" type="email" value={input.name} onChange={changeHandler} id="outlined-basic" label="Имя участника" variant="outlined" size="large" color="warning" />
          <TextField className="TextField" name="password" type="password" value={input.password} onChange={changeHandler} id="outlined-basic" label="Пароль" variant="outlined" size="small" color="warning" />
          <Button type="submit" sx={{ backgroundColor: 'transparent', color: 'burlywood' }} variant="outlined" onClick={submitHandler}>Войти</Button>
          {error && <p> entered incorrect data </p>}
        </Box>
      </List>
    </Box>
  );
  return (
    <div style={{ width: 'max-content', marginLeft: 'auto' }}>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor} id="test_test">
          <Button onClick={toggleDrawer(anchor, true)}><Avatar src="/broken-image.jpg" /></Button>
          <SwipeableDrawer
            id="check_this"
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
