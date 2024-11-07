import { useState } from 'react';
import { Menu } from './Menu/Menu.jsx';
import { Button } from '../../../../../../../../../../_general/Button/Button.jsx';
import { MenuDotsOutline } from '../../../../../../../../../../_general/icons/MenuDotsOutline.jsx';
import cn from './SideMenu.module.scss';

export const SideMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className={cn.menuContainer}>
        <Button
          size="medium"
          IconLeft={MenuDotsOutline}
          color="secondary"
          onClick={openMenu}
        ></Button>
        {isMenuOpen && <Menu closeMenu={closeMenu} position="bottomLeft" />}
      </div>
    </>
  );
};
