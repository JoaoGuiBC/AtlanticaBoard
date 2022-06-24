import { differenceInDays, parseISO } from 'date-fns';

export function checkIsDeadlineClose(date: string) {
  const difference = differenceInDays(parseISO(date), new Date());

  const result = difference <= 7;

  return result;
}
