import cn from './SideMenu.module.css';
import { useState } from 'react';
import { useStoreEffect } from '../../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';
import { VerticalMoreIcon } from '../../../../../../assets/components/VerticalMoreIcon.tsx';
import { DeleteModal } from './DeleteModal/DeleteModal.tsx';
import cnm from 'classnames';
import { Popup } from './Popup/Popup.tsx';

export const SideMenu = ({ accountId }: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const deleteAccount = useStoreEffect((store: any) => store.accounts.deleteAccount);
  const navigate = useNavigate();

  const openModal = () => {
    setAnchorEl(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const remove = () => {
    deleteAccount({ accountId, navigate });
    setOpen(false);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <div className={cn.menuContainer}>
        <button className={cnm(cn.menuButton, anchorEl && cn.active)} onClick={openMenu}>
          <VerticalMoreIcon style={cnm(cn.icon, anchorEl && cn.active)} size={24} />
        </button>
        <Popup
          isOpen={Boolean(anchorEl)}
          openModal={openModal}
          handleClose={closeMenu}
          position="bottomLeft"
        />
      </div>
      {isOpen && <DeleteModal isOpen={isOpen} closeModal={closeModal} remove={remove} />}
    </>
  );
};
