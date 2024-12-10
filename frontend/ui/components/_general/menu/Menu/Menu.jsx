import { useEffect, useState } from 'react';
import { Button } from '../../Button/Button.jsx';
import { addPropsToChildren } from '../../../../utils.js';
import cnm from 'classnames';
import cn from './Menu.module.scss';

export const Menu = ({ children, Opener, classes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const closeMenu = () => setIsOpen(false);
    if (isOpen) document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, [isOpen]);

  const menuOpener = Opener ? (
    <Opener onClick={openMenu} />
  ) : (
    <Button
      size="small"
      color="tertiary"
      IconLeft={() => <span className={cn.menuIcon} />}
      onClick={openMenu}
    />
  );

  const childrenWithProps = addPropsToChildren(children, {
    closeMenu,
  });

  return (
    <div className={cnm(cn.container, classes?.container)}>
      {menuOpener}
      {isOpen && (
        <div className={cnm(cn.menu, classes?.menu)} onMouseDown={(e) => e.stopPropagation()}>
          {childrenWithProps}
        </div>
      )}
    </div>
  );
};
