export const badgeList = [
  'pink',
  'purple',
  'indigo',
  'blue',
  'teal',
  'green',
  'amber',
  'red',
  'brown',
  'grey',
];

export const getRandomBadge = () => {
  const randomColor = Math.floor(Math.random() * badgeList.length);
  return badgeList[randomColor];
};