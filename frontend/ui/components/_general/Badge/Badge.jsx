import cn from './Badge.module.scss';
import { useMemo } from 'react';

const colors = {
  pink: cn.pink,
  purple: cn.purple,
  indigo: cn.indigo,
  blue: cn.blue,
  teal: cn.teal,
  green: cn.green,
  amber: cn.amber,
  red: cn.red,
  brown: cn.brown,
  grey: cn.grey,
};

const getBadgeColor = (color) => {
  return colors[color] ? colors[color] : colors['pink'];
};

export const Badge = ({ badge }) => {
  const badgeColor = useMemo(() => getBadgeColor(badge), [badge]);

  return <div className={badgeColor} />;
};
