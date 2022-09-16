import {
  Avatar, Box, CardContent, CardHeader, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ButtonLKDel from './ButtonLKDel';
import LocationItem from './LocationItem';

export default function LocationTable() {
  const [UserlocationState, setUserlocationState] = useState([]);
  const userId = useSelector((state) => state.auth.id);
  const [delState, setDelState] = useState(0);
  // console.log(userId);

  useEffect(() => {
    fetch('http://localhost:3002/getAllUsersLocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    })
      .then((res) => res.json())
      .then((res) => setUserlocationState(res));
  }, [userId, delState]);

  const onClickLoc = async (id) => {
    await fetch('http://localhost:3002/userLocDel', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then((r) => setDelState(Math.random()));
  };

  return (
    <div className="LocationItem">
      <h2 style={{ color: 'white', textAlign: 'center' }}>Мои Локации</h2>
      { UserlocationState.length !== 0
        ? (
          <>
            {UserlocationState.map((elem) => (
              <LocationItem
                elem={elem}
                onClickLoc={onClickLoc}
              />
            )) }
          </>
        )
        : (
          <Box sx={{
            backgroundColor: '#f8f9fa24',
            borderRadius: '25px',
            margin: '10px'
          }}
          >
            <CardContent sx={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', backgroundColor: '#282b18d1', borderRadius: '14px'
            }}
            >
              <Typography gutterBottom variant="h5" component="div">
                <h4>Чтобы просмотреть свои локации, добавьте их на карту</h4>
              </Typography>
            </CardContent>
          </Box>
        )}
    </div>
  );
}
