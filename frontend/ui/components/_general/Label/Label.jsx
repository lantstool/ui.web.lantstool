import { useMemo } from 'react';
import cnm from 'classnames';
import cn from './Label.module.scss';

const types = {
  success: { label: cn.success },
  grey: { label: cn.grey },
  error: { label: cn.error },
  cyan: { label: cn.cyan },
  blue: { label: cn.blue },
  purple: { label: cn.purple },
  red: { label: cn.red },
  green: { label: cn.green },
};

const getType = (color) => {
  return types[color];
};

export const Label = ({ color, children, Icon, iconStyles = null }) => {
  const { label } = useMemo(() => getType(color), [color]);

  return (
    <label className={label}>
      {Icon && <Icon style={cn.icon} />}
      {iconStyles && <span className={cnm(iconStyles, cn.iconBase)} />}
      <span className={cn.text}>{children}</span>
    </label>
  );
};
