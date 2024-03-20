import cn from './SideMenu.module.css';
import { useState, useRef } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useStoreEffect } from '../../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';
import cnm from 'classnames';
import { EditModal } from './EditModal/EditModal.tsx';
import { DeleteModal } from './DeleteModal/DeleteModal.tsx';
import { Popup } from './Popup/Popup.tsx';

export const SideMenu = ({ transactionId }: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const onDuplicateTransaction = useStoreEffect(
    (store: any) => store.transactions.onDuplicateTransaction,
  );

  const openModal = (type: any) => {
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

  const handleClickOutside = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={cn.menuContainer} ref={menuRef}>
        <button className={cnm(cn.menuButton, isOpen && cn.active)} onClick={openMenu}>
          <MoreVertOutlinedIcon />
        </button>
        {isOpen && (
          <Popup
            isOpen={isOpen}
            openModal={openModal}
            duplicate={duplicate}
            handleClose={handleClickOutside}
            position='left'
          />
        )}
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
