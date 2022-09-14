import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CompliteWindow from '../info/CompliteWindow';
import Info from '../info/Info';
import MainPrivate from './MainPrivate';
import NewsBlog from './NewsBlog';

export default function Main() {
  const user = useSelector((store) => store.auth);
  const showComplited = useSelector((state) => state.showComplited);

  console.log(showComplited);

  return (
    <div className="main-div" style={{}}>
      {!user.id
      && (
        showComplited.status ? (<CompliteWindow />) : (<Info />)
      )}
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
