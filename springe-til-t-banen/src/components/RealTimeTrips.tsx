import React from 'react';
import useSWR from 'swr';
import { getDepartures } from '../clients/enturClient';
import { getTimePart } from '../utils/dateUtils';
import { LiveClock } from './LiveClock';

export const RealTimeTrips = () => {
  const { data: departures } = useSWR('trips', () => getDepartures('NSR:StopPlace:5862', 'NSR:StopPlace:6488'));
  if (!departures) {
    return <p>Laster data...</p>;
  }
  if (departures && departures.length < 1) {
    return <p>Fant ingen avganger</p>;
  }
  return <div>
    <h2>Avganger fra {departures[0].quay?.name}</h2>
    <LiveClock />
    {departures.map((departure, i) => {
      const plannedDepartureTime = departure.aimedDepartureTime;
      const expectedDepartureTime = departure.expectedDepartureTime;
      // departure.legs[0].serviceJourney.
      return (
        <div key={i}>
          <span>{departure.serviceJourney.journeyPattern?.line.publicCode} {departure.destinationDisplay.frontText} </span>
          <span>{getTimePart(plannedDepartureTime)}</span>
          {plannedDepartureTime !== expectedDepartureTime && <span> Forventet {getTimePart(expectedDepartureTime)}</span>}
        </div>);
    }
    )}</div>;
};
