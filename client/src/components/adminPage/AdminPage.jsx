import React, { useState } from 'react';
import AllUsersTable from './allUsersTable/AllUsersTable';
import PotentialUserTable from './allUsersTable/potentialUserTable/PotentialUserTable';
import './AdminPage.css';

export default function AdminPage() {
  const [delStatePotential, setDelStatePotential] = useState(0);

  const delPotentialAddUser = async (id, elem) => {
    console.log('function start');
    await fetch('http://localhost:3002/PotentialUserAdd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ elem })
    });

    await fetch('http://localhost:3002/PotentialuserDel', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
    setDelStatePotential(Math.random());
  };
  return (
    <div className="general">
      <PotentialUserTable
        delStatePotential={delStatePotential}
        setDelStatePotential={setDelStatePotential}
        delPotentialAddUser={delPotentialAddUser}
      />
      <AllUsersTable delStatePotential={delStatePotential} />
    </div>
  );
}
