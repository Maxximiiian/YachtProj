import React, { useEffect, useState } from 'react';
import PotentialUserItem from './PotentialUserItem';
import './PotentialUserTable.css';

export default function PotentialUserTable() {
  const [potentialUsres, setPotentialUsers] = useState([]);
  const [delState, setDelState] = useState(0);
  useEffect(() => {
    fetch('http://localhost:3002/getAllPotentialUsers')
      .then((res) => res.json())
      .then((res) => { setPotentialUsers(res); console.log(res); });
  }, [delState]);

  const DelUser2 = async (id) => {
    await fetch('http://localhost:3002/PotentialuserDel', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
    setDelState(Math.random());
  };
  return (
    <div className="conteiner3">
      <div className="titleeH5"><h5>Потенциальнае пользователи</h5></div>
      {potentialUsres && potentialUsres.map((elem) => (
        <PotentialUserItem
          key={elem.email}
          elem={elem}
          DelUser2={DelUser2}
        />
      ))}
    </div>
  );
}
