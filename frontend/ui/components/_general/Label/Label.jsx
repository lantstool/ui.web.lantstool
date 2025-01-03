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

export const Label = ({ color, children, iconStyles = null }) => {
  const { label } = useMemo(() => getType(color), [color]);

  return (
    <div className={cn.label}>
      <label className={label}>
        {iconStyles && <span className={cnm(iconStyles, cn.iconBase)} />}
        <span className={cn.text}>{children}</span>
      </label>
    </div>
  );
};
