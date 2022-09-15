import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AllUsersTable from './allUsersTable/AllUsersTable';
import PotentialUserTable from './allUsersTable/potentialUserTable/PotentialUserTable';
import './AdminPage.css';
import AdminReg from '../Modals/AdminReg';

export default function AdminPage() {
  const [delStatePotential, setDelStatePotential] = useState(0);

  const { showForm } = useSelector((store) => store);

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
      <div className="PotentialUserTable">
        <PotentialUserTable
          delStatePotential={delStatePotential}
          setDelStatePotential={setDelStatePotential}
          delPotentialAddUser={delPotentialAddUser}
        />
      </div>
      <div className="AllUsersTable">
        <AllUsersTable delStatePotential={delStatePotential} />
        {showForm && (<AdminReg />)}
      </div>
    </div>
  );
}
