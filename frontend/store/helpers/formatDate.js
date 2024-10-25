export const formatDate = (time) => {
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
