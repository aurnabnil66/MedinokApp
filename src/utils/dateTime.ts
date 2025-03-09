import { format, formatDistance, parseISO } from 'date-fns';
import { format as tzFormat, utcToZonedTime } from 'date-fns-tz';

export const formatDate = (date: Date, formatStr = 'dd-LLL-yyyy'): string => {
  return format(date, formatStr);
};

export const formatDateTime = (date: Date, formatStr = 'dd-LLL-yyy HH:mm'): string => {
  return format(date, formatStr);
};

export const formatDateDistance = (date: Date): string => {
  return formatDistance(date, new Date(), { addSuffix: true, includeSeconds: false });
};

export const formatDateTimeUTC = (
  date: Date,
  tz: string,
  formatStr = 'yyyy-MM-dd kk:mm:ss xxx'
): string => {
  return tzFormat(utcToZonedTime(parseISO(new Date(date) as unknown as string), tz), formatStr, {
    timeZone: tz
  });
};

export const formatDateTimeISO = (date: Date): string => {
  const parsedTime = parseISO(new Date(date) as unknown as string);
  return parsedTime as unknown as string;
};
