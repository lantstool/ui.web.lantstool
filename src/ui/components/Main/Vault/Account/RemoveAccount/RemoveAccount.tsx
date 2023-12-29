import cn from './RemoveAccount.module.css';
import { Modal } from '../../../../general/Modal/Modal.tsx';
import { useState } from 'react';
import { useStoreEffect } from '../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Menu, MenuItem } from '@mui/material';

export const RemoveAccount = (accountId: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const onRemoveAccount = useStoreEffect((store: any) => store.vault.onRemoveAccount);
  const navigate = useNavigate();
  const openModal = () => {
    setAnchorEl(null);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const remove = () => {
    onRemoveAccount({ accountId, navigate });
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
          <MenuItem onClick={openModal}>Remove</MenuItem>
        </Menu>
      </div>

      <Modal isOpen={isOpen} close={closeModal}>
        <div className={cn.container}>
          <h2 className={cn.title}>Remove account for vault</h2>
          <p className={cn.subtitle}>
            Are you sure to remove this account from the vault? It will also remove all keys from
            this vault. Notice this action only removes data locally from this app and DOESN'T make
            any changes on the blockchain.
          </p>
          <div className={cn.buttonGroup}>
            <button className={cn.btnRemove} onClick={remove}>
              Remove
            </button>
            <button className={cn.btnClose} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
