import createEnturClient from '@entur/sdk';

const enturClient = createEnturClient({ clientName: 'hobbyprosjekt-springetiltbanen' });

export const getRealTimeTrips = async (fromStop: string, toStop: string) => {
  const trips = await enturClient.getTripPatterns({ from: { place: fromStop }, to: { place: toStop } });
  // console.log(trips);
  return trips;
};

export const getDepartures = async (fromStop: string, toStop: string) => {
  const departures = await enturClient.getDeparturesBetweenStopPlaces(fromStop, toStop, { limit: 6 });
  console.log(departures);
  return departures;
};
