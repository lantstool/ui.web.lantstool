import { Popper } from '@gc/Popper/Popper.jsx';
import { DeleteModal } from '../../../../../../_general/DeleteModal/DeleteModal.jsx';
import { useToggler } from '@hooks/useToggler.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useRef } from 'react';
import cnm from 'classnames';
import cn from './Menu.module.scss';

export const Menu = ({ item, isOpenMenu, openMenu, closeMenu }) => {
  const navigate = useNavigate();
  const { spaceId, networkId, callId } = useParams();
  const removeCallFolder = useStoreEffect((store) => store.nearProtocol.folders.removeCallFolder);
  const anchorRef = useRef(null);

  const [isDeleteOpen, openDelete, closeDelete] = useToggler(false);
  const openModal = () => {
    openDelete();
    closeMenu();
  };

  const remove = () =>
    removeCallFolder({
      spaceId,
      networkId,
      callId,
      item,
      navigate,
      closeModal: closeDelete,
    });

  return (
    <>
      <div className={cn.menu} ref={anchorRef}>
        <button className={cnm(cn.menuButton)} onClick={openMenu}>
          <span className={cn.menuIcon} />
        </button>
        <Popper
          isOpen={isOpenMenu}
          closeMenu={closeMenu}
          position="left"
          anchorEl={anchorRef.current}
        >
          <div className={cn.container}>
            <button className={cn.folderButton} onClick={openModal}>
              <span className={cn.deleteIcon} />
              <p className={cn.title}>Delete</p>
            </button>
          </div>
        </Popper>
      </div>
      {isDeleteOpen && (
        <DeleteModal closeModal={closeDelete} item={item} text={'folder'} remove={remove} />
      )}
    </>
  );
};
