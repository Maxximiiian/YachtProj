import React from 'react';
import { useSelector } from 'react-redux';
import NotAuth from '../auth/NotAuth';

export default function Main() {
  const { auth } = useSelector((state) => state);
  return (
    <div>
      ЫЫЫЫЫ
    </div>
  );
}
