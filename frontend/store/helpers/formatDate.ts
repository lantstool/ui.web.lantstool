import { format, isThisYear, isToday, isYesterday } from 'date-fns';

type Timestamp = number;

interface FormattedDate {
  date: string; // 'Today' | 'Yesterday' | 'Mar 15'
  hourMinute: string; // '14:30'
}

export const formatDate = (time: Timestamp): FormattedDate => {
  const dateTime = new Date(time);
  const currentDate = new Date();

  const sameDay = dateTime.toDateString() === currentDate.toDateString();
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  const isYesterday = dateTime.toDateString() === yesterday.toDateString();

  const date = sameDay
    ? 'Today'
    : isYesterday
      ? 'Yesterday'
      : dateTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const hourMinute = dateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return { date, hourMinute };
};

export const dateFormatter = (dateTime: Timestamp): string => {
  if (isToday(dateTime)) {
    return `Today, at ${format(dateTime, 'HH:mm')}`;
  }
  if (isYesterday(dateTime)) {
    return `Yesterday, at ${format(dateTime, 'HH:mm')}`;
  }

  const formattedDate = format(dateTime, 'MMM d');
  const formattedTime = format(dateTime, 'HH:mm');

  return isThisYear(dateTime)
    ? `${formattedDate} at ${formattedTime}`
    : `${formattedDate}, ${format(dateTime, 'yyyy')} at ${formattedTime}`;
};
