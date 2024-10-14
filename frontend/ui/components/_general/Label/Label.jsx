import { useMemo } from 'react';
import cn from './Label.module.scss';

const types = {
  success: { label: cn.success, text: cn.text, iconColor: cn.icon },
  grey: { label: cn.grey, text: cn.text, iconColor: cn.icon },
  error: { label: cn.error, text: cn.text, iconColor: cn.icon },
  cyan: { label: cn.cyan, text: cn.text, iconColor: cn.icon },
  blue: { label: cn.blue, text: cn.text, iconColor: cn.icon },
  purple: { label: cn.purple, text: cn.text, iconColor: cn.icon },
  red: { label: cn.red, text: cn.text, iconColor: cn.icon },
  green: { label: cn.green, text: cn.text, iconColor: cn.icon },
};

const getType = (color) => {
  return types[color];
};

export const Label = ({ color, children, Icon }) => {
  const { label, text, iconColor } = useMemo(() => getType(color), [color]);

  return (
    <label className={label}>
      {Icon && <Icon style={iconColor} />}
      <span className={text}>{children}</span>
    </label>
  );
};
