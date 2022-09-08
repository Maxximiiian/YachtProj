import React from 'react';
import { Link } from 'react-router-dom';

export default function NotAuth() {
  return (
    <div className="mx-auto mt-5" style={{ width: '400px' }}>
      <div style={{ height: '150px' }} />
      <form className="container zal rounded-3 py-3 item">
        <div className="mb-3">
          <h2>You are not auth...</h2>
        </div>
        <div className="mx-auto mt-5">
          <h2>To use Supa ToDo please Auth or Register</h2>
          <div>
            <Link to="/auth" className="btn btn-danger">Auth</Link>
          </div>
          <div className="pt-3">
            <Link to="/registration" className="btn btn-danger">Registration</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
