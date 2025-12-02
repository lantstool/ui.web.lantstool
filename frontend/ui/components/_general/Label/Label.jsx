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

const getSize = {
  medium: cn.medium,
  small: cn.small,
};

export const Label = ({ color, children, iconStyles = null, size = 'medium' }) => {
  const { label } = useMemo(() => getType(color), [color]);

  return (
    <div className={cn.label}>
      <label className={cnm(label, getSize[size])}>
        {iconStyles && <span className={cnm(iconStyles, cn.iconBase)} />}
        <span className={cn.text}>{children}</span>
      </label>
    </div>
  );
};
