import React, { useEffect, useState } from 'react';
import './AllUsersTable.css';
import ItemUser from './ItemUser';

export default function AllUsersTable() {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3002/getAllRegUsers')
      .then((res) => res.json())
      .then((res) => setAllUsers(res));
  }, []);
  const DelUser = (id) => {
    fetch('http://localhost:3002/userDel', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
  };
  return (
    <div className="conteiner2">
      <div className="titleeH5"><h5>Все зарегистрированные пользователи</h5></div>
      {allUsers && allUsers.map((elem) => (
        <ItemUser
          key={elem.email}
          elem={elem}
          DelUser={DelUser}
        />
      ))}
    </div>
  );
}
