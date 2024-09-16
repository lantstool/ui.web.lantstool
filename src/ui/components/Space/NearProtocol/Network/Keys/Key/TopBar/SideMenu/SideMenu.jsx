import cn from './SideMenu.module.css';
import { useState } from 'react';
import { useStoreEffect } from '../../../../../../../../../react-vault/index.js';
import { useNavigate } from 'react-router-dom';
import { VerticalMoreIcon } from '../../../../../../../../assets/components/VerticalMoreIcon.jsx';
import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import cnm from 'classnames';
import { Popup } from '../../../../Accounts/Account/TopBar/SideMenu/Popup/Popup.jsx';

export const SideMenu = ({ keyId }) => {
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const deleteKey = useStoreEffect((store) => store.keys.deleteKey);
  const navigate = useNavigate();

  const openModal = () => {
    setAnchorEl(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const remove = () => {
    deleteKey({ keyId, navigate });
    setOpen(false);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const openMenu = (event) => {
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
