import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import './SideBarFormLogIn.css';
import { Avatar } from '@mui/material';

export default function SideBarFormLogIn() {
  const [state, setState] = React.useState({ right: false });
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, backgroundColor: 'light gray', height: '100%' }}
      role="presentation"
    >
      <List sx={{ paddingLeft: '40px', color: 'burlywood' }}>Вход для участников</List>
      <Divider />
      <List>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Имя участника" variant="outlined" size="small" />
          <TextField id="outlined-basic" label="Пароль" variant="outlined" size="small" />
          <Button sx={{ backgroundColor: 'transparent', color: 'burlywood' }} variant="outlined" href="/main" onClick={() => setState((prev) => ({ ...prev, [anchor]: false }))}>Войти</Button>
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
