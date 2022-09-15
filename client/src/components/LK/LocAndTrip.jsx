import React from 'react';
import './LocAndTrip.css';
import LocationTable from './LocationTable';
import TripsTable from './TripsTable';

export default function LocAndTrip() {
  return (
    <div className="LocAndTrip">
      <div className="locations" style={{ width: '50%' }}>
        <LocationTable />
      </div>
      <div className="trips" style={{ width: '50%' }}>
        <div className="postTrips">
          <TripsTable />
        </div>
      </div>
    </div>
  );
}
