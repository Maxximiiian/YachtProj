import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CompliteWindow from '../info/CompliteWindow';
import Info from '../info/Info';
import MainPrivate from './MainPrivate';
import NewsBlog from './NewsBlog';
import video5 from '../../assests/video5.mp4';

export default function Main() {
  const user = useSelector((store) => store.auth);
  const showComplited = useSelector((state) => state.showComplited);

  console.log(showComplited);

  return (
    <div className="main-div" style={{}}>
      <video src={video5} style={{ position: 'absolute', width: '100%' }} autoPlay loop muted />
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
