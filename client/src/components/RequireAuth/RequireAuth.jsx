import React from 'react';
import { useSelector } from 'react-redux';

const { Navigate } = require('react-router-dom');

export default function RequireAuth({ children }) {
  const user = useSelector((store) => store.auth);

  if (!user.id) {
    return <Navigate to="/" replace />;
  }
  return children;
}
