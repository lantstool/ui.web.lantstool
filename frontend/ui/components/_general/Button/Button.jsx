import { useMemo } from 'react';
import cn from './Button.module.scss';

const types = (isIcon, children) => {
  return {
    primary: {
      large: {
        button: isIcon ? cn.primaryLgIcon : cn.primaryLg,
        btnText: cn.primaryText,
        iconColor: cn.iconPrimary,
      },
      medium: {
        button: isIcon ? cn.primaryMgIcon : cn.primaryMg,
        btnText: cn.primaryText,
        iconColor: cn.iconPrimary,
      },
    },
    secondary: {
      large: {
        button: isIcon ? cn.secondaryLgIcon : cn.secondaryLg,
        btnText: cn.secondaryText,
        iconColor: cn.iconSecondary,
      },
      medium: {
        button: isIcon ? cn.secondaryMgIcon : cn.secondaryMg,
        btnText: cn.secondaryText,
        iconColor: cn.iconSecondary,
      },
    },
    danger: {
      large: {
        button: isIcon ? cn.dangerLgIcon : cn.dangerLg,
        btnText: cn.primaryText,
        iconColor: cn.iconPrimary,
      },
      medium: {
        button: isIcon ? cn.dangerMgIcon : cn.dangerMg,
        btnText: cn.primaryText,
        iconColor: cn.iconPrimary,
      },
    },
    dangerSecondary: {
      large: {
        button: isIcon ? cn.dangerSecondaryLgIcon : cn.dangerSecondaryLg,
        btnText: cn.dangerSecondaryText,
        iconColor: cn.iconDangerSecondary,
      },
      medium: {
        button: isIcon ? cn.dangerSecondaryMgIcon : cn.dangerSecondaryMg,
        btnText: cn.dangerSecondaryText,
        iconColor: cn.iconDangerSecondary,
      },
    },
    tertiary: {
      large: {
        button: isIcon && !children ? cn.tertiaryLgIcon : cn.tertiaryLg,
        btnText: cn.tertiaryText,
        iconColor: cn.iconTertiary,
      },
      medium: {
        button: isIcon && !children ? cn.tertiaryMgIcon : cn.tertiaryMg,
        btnText: cn.tertiaryText,
        iconColor: cn.iconTertiary,
      },
      small: {
        button: isIcon && !children ? cn.tertiarySmIcon : cn.tertiarySm,
        btnText: cn.tertiaryText,
        iconColor: cn.iconTertiary,
      },
    },
  };
};

const getType = (color, size, IconRight, IconLeft, children) => {
  const isIcon = IconRight || IconLeft;
  return types(isIcon, children)[color][size];
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
  const { button, btnText, iconColor } = useMemo(
    () => getType(color, size, IconRight, IconLeft, children),
    [color, size, IconRight, IconLeft],
  );

  return (
    <button type={type} disabled={disabled} className={button} onClick={onClick}>
      {IconLeft && <IconLeft style={iconColor} />}
      {children && <span className={btnText}>{children}</span>}
      {IconRight && <IconRight style={iconColor} />}
    </button>
  );
};
