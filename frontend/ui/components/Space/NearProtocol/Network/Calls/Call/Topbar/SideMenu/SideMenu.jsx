import cn from './SideMenu.module.scss';
import { useState } from 'react';
import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import { EditModal } from './EditModal/EditModal.jsx';
import cnm from 'classnames';
import { VerticalMoreIcon } from '../../../../../../../_general/icons/VerticalMoreIcon.jsx';
import { Popup } from './Popup/Popup.jsx';

export const SideMenu = ({ callId }) => {
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openModal = (type) => {
    setAnchorEl(type);
    setOpen(!isOpen);
  };

  const openMenu = () => {
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
          handleClose={handleClose}
          position="bottomLeft"
        />
      </div>
      {anchorEl === 'editModal' && (
        <EditModal isOpen={anchorEl} setOpen={setAnchorEl} callId={callId} />
      )}
      {anchorEl === 'deleteModal' && (
        <DeleteModal isOpen={anchorEl} setOpen={setAnchorEl} callId={callId} />
      )}
    </>
  );
};
