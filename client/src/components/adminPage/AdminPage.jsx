import React from 'react';
import AllUsersTable from './allUsersTable/AllUsersTable';
import PotentialUserTable from './allUsersTable/potentialUserTable/PotentialUserTable';
import './AdminPage.css';
import AdminReg from '../Modals/AdminReg';

export default function AdminPage() {
  return (
    <div className="general">
      <PotentialUserTable />
      <AllUsersTable />
      <AdminReg />
    </div>
  );
}
