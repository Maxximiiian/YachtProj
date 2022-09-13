import React from 'react';
import { useSelector } from 'react-redux';
import Info from '../info/Info';
import MainPrivate from './MainPrivate';
import NewsBlog from './NewsBlog';

export default function Main() {
  const user = useSelector((store) => store.auth);
  return (
    <div className="main-div">
      {!user.id
      && <Info />}
      {user.id
        && (
        <div>
          <MainPrivate />
          {' '}
        </div>
        )}
      {user.id
        && (
        <div>
          <NewsBlog />
        </div>
        )}
    </div>
  );
}
