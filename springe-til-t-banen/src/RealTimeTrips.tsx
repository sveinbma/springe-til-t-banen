import React from 'react';
import useSWR from 'swr';
import { getRealTimeTrips } from './clients/enturClient';
import { getTimePart } from './utils/dateUtils';

export const RealTimeTrips = () => {
  const { data: tripData } = useSWR('test', () => getRealTimeTrips('NSR:StopPlace:5862', 'NSR:StopPlace:6488'));
  if (!tripData) {
    return <p>Laster data...</p>;
  }
  if (tripData && tripData.length < 1) {
    return <p>Fant ingen avganger</p>;
  }
  return <div>
    <h2>Avganger fra {(tripData[0].legs[0].fromPlace.name)} til {tripData[0].legs[0].toPlace.name}</h2>
    {tripData.map(trip => {
      const plannedDepartureTime = trip.legs[0].fromEstimatedCall?.aimedDepartureTime;
      const expectedDepartureTime = trip.legs[0].fromEstimatedCall?.expectedDepartureTime;
      return (
        <div key={trip.id}>
          <span>Planlagt avgang: {plannedDepartureTime ? getTimePart(plannedDepartureTime) : '---'}</span>
          <span>Forventet avgang: {expectedDepartureTime ? getTimePart(expectedDepartureTime) : '---'}</span>
        </div>);
    }
    )}</div>;
};
