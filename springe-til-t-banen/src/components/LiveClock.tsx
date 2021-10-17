import React from 'react';
import { formatTimePart } from '../utils/dateUtils';

export const LiveClock = () => {
  const [time, setTime] = React.useState<Date>(new Date());

  React.useEffect(() => { setInterval(() => setTime(new Date()), 1000); });

  return <h4>{formatTimePart(time)}</h4>;
};
