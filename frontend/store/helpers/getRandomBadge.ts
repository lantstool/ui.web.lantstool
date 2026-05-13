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
] as const;

export type Badge = (typeof badgeList)[number];

export const getRandomBadge = (): Badge => {
  const randomColor = Math.floor(Math.random() * badgeList.length);
  return badgeList[randomColor]!;
};
