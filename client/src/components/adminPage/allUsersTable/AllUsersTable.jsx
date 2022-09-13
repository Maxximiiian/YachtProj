import React, { useEffect, useState } from 'react';
import './AllUsersTable.css';
import ItemUser from './ItemUser';

export default function AllUsersTable({ delStatePotential }) {
  const [allUsers, setAllUsers] = useState([]);
  const [delState, setDelState] = useState(0);
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
  return (
    <div className="conteiner2">
      <div className="titleeH5"><h5>Все зарегистрированные пользователи</h5></div>
      {allUsers && allUsers.map((elem) => (
        <ItemUser
          key={elem.id}
          elem={elem}
          DelUser={DelUser}
        />
      ))}
    </div>
  );
}
