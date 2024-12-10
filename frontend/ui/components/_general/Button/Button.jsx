import { useMemo } from 'react';
import cnm from 'classnames';
import cn from './Button.module.scss';

const types = (isIcon, children) => {
  return {
    primary: {
      large: {
        button: isIcon ? cn.primaryLgIcon : cn.primaryLg,
        btnText: cn.primaryText,
        iconColor: cn.iconPrimary,
        iconStyle: cn.iconPrimaryStyle,
      },
      medium: {
        button: isIcon ? cn.primaryMgIcon : cn.primaryMg,
        btnText: cn.primaryText,
        iconColor: cn.iconPrimary,
        iconStyle: cn.iconPrimaryStyle,
      },
    },
    secondary: {
      large: {
        button: isIcon ? cn.secondaryLgIcon : cn.secondaryLg,
        btnText: cn.secondaryText,
        iconColor: cn.iconSecondary,
        iconStyle: cn.iconSecondaryStyle,
      },
      medium: {
        button: isIcon ? cn.secondaryMgIcon : cn.secondaryMg,
        btnText: cn.secondaryText,
        iconColor: cn.iconSecondary,
        iconStyle: cn.iconSecondaryStyle,
      },
    },
    danger: {
      large: {
        button: isIcon ? cn.dangerLgIcon : cn.dangerLg,
        btnText: cn.primaryText,
        iconColor: cn.iconPrimary,
        iconStyle: cn.iconPrimaryStyle,
      },
      medium: {
        button: isIcon ? cn.dangerMgIcon : cn.dangerMg,
        btnText: cn.primaryText,
        iconColor: cn.iconPrimary,
        iconStyle: cn.iconPrimaryStyle,
      },
    },
    dangerSecondary: {
      large: {
        button: isIcon ? cn.dangerSecondaryLgIcon : cn.dangerSecondaryLg,
        btnText: cn.dangerSecondaryText,
        iconColor: cn.iconDangerSecondary,
        iconStyle: cn.iconDangerSecondaryStyle,
      },
      medium: {
        button: isIcon ? cn.dangerSecondaryMgIcon : cn.dangerSecondaryMg,
        btnText: cn.dangerSecondaryText,
        iconColor: cn.iconDangerSecondary,
        iconStyle: cn.iconDangerSecondaryStyle,
      },
    },
    tertiary: {
      large: {
        button: isIcon && !children ? cn.tertiaryLgIcon : cn.tertiaryLg,
        btnText: cn.tertiaryText,
        iconColor: cn.iconTertiary,
        iconStyle: cn.iconTertiaryStyle,
      },
      medium: {
        button: isIcon && !children ? cn.tertiaryMgIcon : cn.tertiaryMg,
        btnText: cn.tertiaryText,
        iconColor: cn.iconTertiary,
        iconStyle: cn.iconTertiaryStyle,
      },
      small: {
        button: isIcon && !children ? cn.tertiarySmIcon : cn.tertiarySm,
        btnText: cn.tertiaryText,
        iconColor: cn.iconTertiary,
        iconStyle: cn.iconTertiaryStyle,
      },
    },
  };
};

const getType = (color, size, IconRight, IconLeft, children, iconLeftStyles, iconRightStyles) => {
  const isIcon = IconRight || IconLeft || iconLeftStyles || iconRightStyles;
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
  iconLeftStyles = null,
  iconRightStyles = null,
}) => {
  const { button, btnText, iconColor, iconStyle } = useMemo(
    () => getType(color, size, IconRight, IconLeft, children, iconLeftStyles, iconRightStyles),
    [color, size, IconRight, IconLeft],
  );

  return (
    <button type={type} disabled={disabled} className={button} onClick={onClick}>
      {IconLeft && <IconLeft style={iconColor} />}
      {iconLeftStyles && <span className={cnm(iconStyle, iconLeftStyles)} />}
      {children && <span className={btnText}>{children}</span>}
      {IconRight && <IconRight className={iconColor} />}
      {iconRightStyles && <span className={cnm(iconStyle, iconRightStyles)} />}
    </button>
  );
};
