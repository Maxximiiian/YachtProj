import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TripItem from './TripItem';

export default function TripsTable() {
  const [UserTripState, setUserTripState] = useState([]);
  const userId = useSelector((state) => state.auth.id);
  const [delState, setDelState] = useState(0);
  // console.log(userId);

  useEffect(() => {
    fetch('http://localhost:3002/getAllUsersTrips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    })
      .then((res) => res.json())
      .then((res) => { setUserTripState(res); console.log(res, 'resssssssss'); });
  }, [userId, delState]);

  const onClickTrip = async (id) => {
    await fetch('http://localhost:3002/userTripDel', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then((r) => setDelState(Math.random()));
  };

  return (
    <div className="locItem">
      <h2 style={{ color: 'white', textAlign: 'center' }}>Мои Маршруты</h2>
      {UserTripState.length && UserTripState.map((elem) => (
        <TripItem
          elem={elem}
          onClickTrip={onClickTrip}
        />
      )) }
    </div>

  );
}
