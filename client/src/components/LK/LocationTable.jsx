import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LocationItem from './LocationItem';

export default function LocationTable() {
  const [UserlocationState, setUserlocationState] = useState([]);
  const userId = useSelector((state) => state.auth.id);
  const [delState, setDelState] = useState(0);
  // console.log(userId);

  useEffect(() => {
    fetch('http://localhost:3002/getAllUsersLocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    })
      .then((res) => res.json())
      .then((res) => setUserlocationState(res));
  }, [userId, delState]);

  const onClickLoc = async (id) => {
    await fetch('http://localhost:3002/userLocDel', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then((r) => setDelState(Math.random()));
  };

  return (
    <div className="LocationItem">
      <h2 style={{ color: 'white', textAlign: 'center' }}>Мои Локации</h2>
      { UserlocationState.length && UserlocationState.map((elem) => (
        <LocationItem
          elem={elem}
          onClickLoc={onClickLoc}
        />
      )) }
    </div>

  );
}
