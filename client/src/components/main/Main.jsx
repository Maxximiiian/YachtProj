import React from 'react';
import { useSelector } from 'react-redux';
import Info from '../info/Info';

export default function Main() {
  const user = useSelector((store) => store.auth);
  return (
    <div>
      {!user.id
      && <Info />}
    </div>
  );
}
