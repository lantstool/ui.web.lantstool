import cn from './SideMenu.module.css';
import { useState } from 'react';
import { useStoreEffect } from '../../../../../../../../../../react-vault/index.js';
import { useNavigate } from 'react-router-dom';
import cnm from 'classnames';
import { EditModal } from './EditModal/EditModal.jsx';
import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import { Popup } from './Popup/Popup.jsx';
import { VerticalMoreIcon } from '../../../../../../../../assets/components/VerticalMoreIcon.jsx';

export const SideMenu = ({ transactionId }) => {
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const onDuplicateTransaction = useStoreEffect(
    (store) => store.transactions.onDuplicateTransaction,
  );

  const openModal = (type) => {
    setAnchorEl(type);
    setOpen(!isOpen);
  };

  const openMenu = () => {
    setOpen(!isOpen);
  };

  const duplicate = () => {
    onDuplicateTransaction({ transactionId, navigate });
    setAnchorEl(null);
    setOpen(!isOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={cn.menuContainer}>
        <button className={cnm(cn.menuButton, isOpen && cn.active)} onClick={openMenu}>
          <VerticalMoreIcon style={cnm(cn.icon, isOpen && cn.active)} size={24} />
        </button>
        <Popup
          isOpen={isOpen}
          openModal={openModal}
          duplicate={duplicate}
          handleClose={handleClose}
          position="bottomLeft"
        />
      </div>
      {anchorEl === 'editModal' && (
        <EditModal isOpen={anchorEl} setOpen={setAnchorEl} transactionId={transactionId} />
      )}
      {anchorEl === 'deleteModal' && (
        <DeleteModal isOpen={anchorEl} setOpen={setAnchorEl} transactionId={transactionId} />
      )}
    </>
  );
};
