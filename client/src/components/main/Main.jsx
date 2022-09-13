import React from 'react';
import { useSelector } from 'react-redux';
import Info from '../info/Info';
import MainPrivate from './MainPrivate';
import NewsBlog from './NewsBlog';

export default function Main() {
  const user = useSelector((store) => store.auth);
  return (
    <div className="main-div" style={{}}>
      {!user.id
      && <Info />}
      {user.id
        && (
        <div className="main">
          <MainPrivate />
          {' '}

        </div>
        )}

      {user.id
        && (
        <div className="news">
          <NewsBlog />
        </div>
        )}
    </div>
  );
}
