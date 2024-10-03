import cn from './SideMenu.module.scss';
import { useState } from 'react';
import { useStoreEffect } from '../../../../../../../../../../react-vault/index.js';
import { useNavigate, useParams } from 'react-router-dom';
import { VerticalMoreIcon } from '../../../../../../../_general/IconsComponents/VerticalMoreIcon.jsx';
import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import cnm from 'classnames';
import { Popup } from './Popup/Popup.jsx';

export const SideMenu = ({ accountId }) => {
  const { spaceId, networkId } = useParams();
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const removeAccount = useStoreEffect((store) => store.nearProtocol.accounts.remove);
  const navigate = useNavigate();

  const openModal = () => {
    setAnchorEl(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const remove = () => {
    removeAccount({ spaceId, networkId, accountId, navigate });
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
