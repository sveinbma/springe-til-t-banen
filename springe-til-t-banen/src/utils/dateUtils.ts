import { format, parseISO } from 'date-fns';

export const getTimePart = (dateTime: string) =>
  format(parseISO(dateTime), 'HH:mm:ss');
