import cn from './SideMenu.module.css';
import { useState } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Menu, MenuItem } from '@mui/material';
import { DeleteModal } from './DeleteModal/DeleteModal.tsx';
import { EditModal } from './EditModal/EditModal.tsx';
import { useStoreEffect } from '../../../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';

export const SideMenu = ({ transactionId }: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const onDuplicateTransaction = useStoreEffect(
    (store: any) => store.transactions.onDuplicateTransaction,
  );

  const openModal = (type: any) => {
    setAnchorEl(null);
    setOpen(type);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const duplicate = () => {
    onDuplicateTransaction({ transactionId, navigate });
  };

  return (
    <>
      <div>
        <button className={cn.buttonRemove} onClick={openMenu}>
          <MoreVertOutlinedIcon />
        </button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={() => openModal('editModal')}>Edit name</MenuItem>
          <MenuItem onClick={duplicate}>Duplicate</MenuItem>
          <MenuItem onClick={() => openModal('deleteModal')}>Remove</MenuItem>
        </Menu>
      </div>
      {isOpen === 'editModal' && (
        <EditModal isOpen={isOpen} setOpen={setOpen} transactionId={transactionId} />
      )}
      {isOpen === 'deleteModal' && (
        <DeleteModal isOpen={isOpen} setOpen={setOpen} transactionId={transactionId} />
      )}
    </>
  );
};
