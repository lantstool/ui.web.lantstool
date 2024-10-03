import cn from './Button.module.scss';
import { cloneElement } from 'react';

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
  text = null,
  color = 'primary',
  onClick,
  size = 'large',
  type = 'button',
  iconLeft = null,
  iconRight = null,
  disabled = false,
}) => {
  const { button, btnText, iconColor } = getType(color, size);
  const cloneIconLeft = iconLeft && cloneElement(iconLeft, { style: iconColor });
  const cloneIconRight = iconRight && cloneElement(iconRight, { style: iconColor });

  return (
    <button type={type} disabled={disabled} className={button} onClick={onClick}>
      {iconLeft && cloneIconLeft}
      {text && <h1 className={btnText}>{text}</h1>}
      {iconRight && cloneIconRight}
    </button>
  );
};
