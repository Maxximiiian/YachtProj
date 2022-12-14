/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import './AllUsersTable.css';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import ItemUser from './ItemUser';

export default function AllUsersTable({ delStatePotential }) {
  const auth = useSelector((state) => state.auth);
  console.log('auuuuthhhhha', auth);
  const [allUsers, setAllUsers] = useState([]);
  const [delState, setDelState] = useState(0);
  const [allUserSearchState, setAllUserSearchState] = useState('');

  useEffect(() => {
    fetch('http://localhost:3002/getAllRegUsers')
      .then((res) => res.json())
      .then((res) => setAllUsers(res));
  }, [delState, delStatePotential]);
  const DelUser = async (id) => {
    await fetch('http://localhost:3002/userDel', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then((r) => setDelState(Math.random()));
  };
  console.log(allUsers);
  const allUserSearch = (e) => {
    setAllUserSearchState(e.target.value);

    // setAllUsers(allUsers.filter((user) => user.name === allUserSearchState.name));
  };
  return (
    <>
      <div className="titleeH5"><h5>Все зарегистрированные пользователи</h5></div>
      {' '}
      <Stack spacing={2} sx={{ width: '70%', margin: '10px' }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={allUsers.map((user) => user.name)}
          renderInput={(params) => (
            <TextField
              style={{ border: 'solid white' }}
              name="name"
              {...params}
              label="Поиск"
              InputProps={{
                ...params.InputProps,
                type: 'search'
              }}
              onChange={allUserSearch}
            />
          )}
        />
      </Stack>
      <div className="conteiner2">
        {allUsers && allUsers
          .filter((user) => (allUserSearchState ? user.name.includes(allUserSearchState) : true))
          .filter((user) => (user.email !== auth.email))
          .map((elem) => (
            <ItemUser
              key={elem.id}
              elem={elem}
              DelUser={DelUser}
            />
          ))}
      </div>
    </>
  );
}
