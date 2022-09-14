/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import { Autocomplete, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PotentialUserItem from './PotentialUserItem';
import './PotentialUserTable.css';

export default function PotentialUserTable({
  setDelStatePotential,
  DelStatePotential, delPotentialAddUser, delStatePotential
}) {
  const [potentialUsres, setPotentialUsers] = useState([]);
  const [potentUserSearchState, setPotentUserSearchState] = useState('');

  useEffect(() => {
    fetch('http://localhost:3002/getAllPotentialUsers')
      .then((res) => res.json())
      .then((res) => { setPotentialUsers(res); console.log(res); });
  }, [DelStatePotential, delStatePotential]);

  const DelUser2 = async (id) => {
    await fetch('http://localhost:3002/PotentialuserDel', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
    setDelStatePotential(Math.random());
  };
  const potentUserSearch = (e) => {
    setPotentUserSearchState(e.target.value);
  };
  return (
    <div className="conteiner3">
      <div className="titleeH5"><h5>Потенциальнае пользователи</h5></div>

      <Stack spacing={2} sx={{ width: 500, margin: '10px' }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={potentialUsres.map((user) => user.name)}
          renderInput={(params) => (
            <TextField
              name="name"
              {...params}
              label="Поиск"
              InputProps={{
                ...params.InputProps,
                type: 'search'
              }}
              onChange={potentUserSearch}
            />
          )}
        />
      </Stack>
      {potentialUsres && potentialUsres
        .filter((user) => (potentUserSearchState ? user.name.includes(potentUserSearchState) : true))
        .map((elem) => (
          <PotentialUserItem
            key={elem.id}
            elem={elem}
            DelUser2={DelUser2}
            delPotentialAddUser={delPotentialAddUser}
          />
        ))}
    </div>
  );
}
