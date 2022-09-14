import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import {
  Avatar, Box, Button, ButtonGroup, IconButton, SwipeableDrawer, TextField
} from '@mui/material';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonDel from '../../buttonDel/ButtonDel';
import UserAddButton from './userAddButton/UserAddButton';
import UserAboutButton from './userAboutButton/UserAbotButton';
import ButtunPotentialDell from './ButtunPotentialDell';
import { SET_SHOW_FORM } from '../../../../redux/types/types';

export default function PotentialUserItem({ elem, DelUser2, delPotentialAddUser }) {
  const [stateAbout, setStateAbout] = useState(false);

  const onClickAbout = () => {
    setStateAbout(!stateAbout);
  };

  return (
    <Box sx={{
      backgroundColor: '#f8f9fa24',
      borderRadius: '25px',
      margin: '10px',
      width: '95%'
    }}
    >

      <CardContent sx={{
        display: 'flex', flexDirection: 'column', backgroundColor: '#282b18d1', borderRadius: '14px'
      }}
      >
        <div className="userInfo">
          <Typography gutterBottom variant="h5" component="div">
            <h4>{elem.name}</h4>
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            <h6>{elem.email}</h6>
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            <h6>{elem.phone}</h6>
          </Typography>
          <UserAboutButton onClickAbout={onClickAbout} />
          <UserAddButton
            delPotentialAddUser={delPotentialAddUser}
            elem={elem}
          />
          <ButtunPotentialDell DelUser2={DelUser2} elem={elem} />
        </div>
        {stateAbout && (
        <div className="userAbout">
          <Typography gutterBottom variant="h5" component="div">
            <h6>{elem.about}</h6>
          </Typography>
        </div>
        )}

      </CardContent>
    </Box>
  );
}
