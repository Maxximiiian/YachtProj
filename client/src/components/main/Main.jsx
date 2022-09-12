import React from 'react';
import { useSelector } from 'react-redux';
import Info from '../info/Info';
import MainPrivate from './MainPrivate';

export default function Main() {
  const user = useSelector((store) => store.auth);
  return (
    <div>
      {!user.id
      && <Info />}
      {user.id
        && <MainPrivate />}
    </div>
  );
}
