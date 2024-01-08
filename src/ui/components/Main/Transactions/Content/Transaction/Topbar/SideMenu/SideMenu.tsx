import cn from './SideMenu.module.css';
import { useState } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Menu, MenuItem } from '@mui/material';
import { DeleteModal } from './DeleteModal/DeleteModal.tsx';
import { EditModal } from './EditModal/EditModal.tsx';

export const SideMenu = ({ transactionId }: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
          <MenuItem>Duplicate</MenuItem>
          <MenuItem onClick={() => openModal('deleteModal')}>Remove</MenuItem>
        </Menu>
      </div>
      <EditModal isOpen={isOpen} setOpen={setOpen} transactionId={transactionId} />
      <DeleteModal isOpen={isOpen} setOpen={setOpen} transactionId={transactionId} />
    </>
  );
};
