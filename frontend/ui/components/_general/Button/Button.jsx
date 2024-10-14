import { useMemo } from 'react';
import cn from './Button.module.scss';

const types = {
  primary: {
    large: { button: cn.primaryLg, btnText: cn.primaryText, iconColor: cn.iconPrimary },
    medium: { button: cn.primaryMg, btnText: cn.primaryText, iconColor: cn.iconPrimary },
  },
  secondary: {
    large: { button: cn.secondaryLg, btnText: cn.secondaryText, iconColor: cn.iconSecondary },
    medium: { button: cn.secondaryMg, btnText: cn.secondaryText, iconColor: cn.iconSecondary },
  },
  tertiary: {
    small: { button: cn.tertiary, btnText: cn.tertiaryText, iconColor: cn.iconTertiary },
  },
};

const getType = (color, size) => {
  if (size === 'small' || color === 'tertiary') {
    return types['tertiary']['small'];
  }
  if (color === 'primary') {
    return types[color][size];
  } else if (color === 'secondary') return types[color][size];
};

export const Button = ({
  children = null,
  color = 'primary',
  onClick,
  size = 'large',
  type = 'button',
  IconLeft = null,
  IconRight = null,
  disabled = false,
}) => {
  const { button, btnText, iconColor } = useMemo(() => getType(color, size), [color, size]);

  return (
    <button type={type} disabled={disabled} className={button} onClick={onClick}>
      {IconLeft && <IconLeft style={iconColor} />}
      {children && <span className={btnText}>{children}</span>}
      {IconRight && <IconRight style={iconColor} />}
    </button>
  );
};
