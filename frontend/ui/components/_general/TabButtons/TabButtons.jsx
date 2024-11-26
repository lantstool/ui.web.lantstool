import { Children, cloneElement } from 'react';
import cn from './TabButtons.module.scss';

export const TabButtons = ({ toggle, changeToggle, children }) => (
  <div className={cn.toggle}>
    {Children.map(children, (child) =>
      cloneElement(child, {
        type: 'button',
        className: child.props.value === toggle ? cn.activeButton : cn.button,
        onClick: () => changeToggle(child.props.value),
      }),
    )}
  </div>
);
