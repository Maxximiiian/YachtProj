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
    console.log(e.target.name, e.target.value);
    setInput((prev) => ({ ...prev, name: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (input.password && input.email) {
      dispatch(userSignInThunk(input));
      setInput({});
      nav('/main');
    }
  };

  const list = (anchor) => (
    <Box
      sx={{
        maxWidth: 500,
        backgroundColor: '#00000075 !important',
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
          onSubmit={submitHandler}
        >
          <TextField className="TextField" name="name" value={input.title} onChange={changeHandler} id="outlined-basic" label="Имя участника" variant="outlined" size="large" />
          <TextField className="TextField" name="password" value={input.title} onChange={changeHandler} id="outlined-basic" label="Пароль" variant="outlined" size="small" />
          <Button type="submit" onClick={submitHandler} sx={{ backgroundColor: 'transparent', color: 'burlywood' }} variant="outlined" href="/main" onClick={() => setState((prev) => ({ ...prev, [anchor]: false }))}>Войти</Button>
          {error && <p> entered incorrect data </p>}
        </Box>
      </List>
    </Box>
  );

  return (
    <div style={{ width: 'max-content', marginLeft: 'auto' }}>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><Avatar src="/broken-image.jpg" /></Button>
          <SwipeableDrawer
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
