import React from 'react';
import { useSelector } from 'react-redux';

const { Navigate, useLocation } = require('react-router-dom');

export default function RequireAuth({ children }) {
  const user = useSelector((store) => store.auth);
  const location = useLocation();

  if (!user.id) {
    return <Navigate to="/map" store={{ from: location }} replace />;
  }
  return children;
}
