import { format, parseISO } from 'date-fns';

export function dateFormatter(date: string) {
  const formattedDate = format(
    parseISO(date),
    'dd/MM/yyyy',
  );

  return formattedDate;
}
