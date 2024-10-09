import { useState } from 'react';
import cnm from 'classnames';
import { EditNameModal } from './EditNameModal/EditNameModal.jsx';
import { RemoveModal } from './RemoveModal/RemoveModal.jsx';
import { Menu } from './Menu/Menu.jsx';
import { VerticalMoreIcon } from '../../../../../../../../assets/components/VerticalMoreIcon.jsx';
import cn from './SideMenu.module.scss';

export const SideMenu = ({ transaction }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isRemoveOpen, setRemoveOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const openEditModal = () => {
    closeMenu();
    setEditOpen(true);
  }
  const closeEditModal = () => setEditOpen(false);

  const openRemoveModal = () => {
    closeMenu();
    setRemoveOpen(true);
  }
  const closeRemoveModal = () => setRemoveOpen(false);

  return (
    <>
      <div className={cn.menuContainer}>
        <button className={cnm(cn.menuButton, isMenuOpen && cn.active)} onClick={openMenu}>
          <VerticalMoreIcon style={cnm(cn.icon, isMenuOpen && cn.active)} size={24} />
        </button>
        {isMenuOpen && (
          <Menu
            openEditModal={openEditModal}
            openRemoveModal={openRemoveModal}
            closeMenu={closeMenu}
            position="bottomLeft"
          />
        )}
      </div>
      {isEditOpen && <EditNameModal closeModal={closeEditModal} transaction={transaction} />}
      {isRemoveOpen && <RemoveModal closeModal={closeRemoveModal} />}
    </>
  );
};
