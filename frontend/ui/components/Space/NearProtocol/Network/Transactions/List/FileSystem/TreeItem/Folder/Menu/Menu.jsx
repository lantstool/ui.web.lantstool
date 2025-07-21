import { Popper } from '@gc/Popper/Popper.jsx';
import { DeleteModal } from '../../_general/DeleteModal/DeleteModal.jsx';
import { useToggler } from '@hooks/useToggler.js';
import cnm from 'classnames';
import cn from './Menu.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';

export const Menu = ({ item, isOpenMenu, openMenu, closeMenu }) => {
  const navigate = useNavigate();
  const { spaceId, networkId } = useParams();
  const removeTxFolder = useStoreEffect((store) => store.nearProtocol.folders.removeTxFolder);

  const [isDeleteOpen, openDelete, closeDelete] = useToggler(false);

  const openModal = () => {
    openDelete();
    closeMenu();
  };

  const remove = () =>
    removeTxFolder({
      spaceId,
      networkId,
      transactionId: item.transactionId,
      item,
      navigate,
      closeDelete,
    });

  return (
    <>
      <div className={cn.menu}>
        <button className={cnm(cn.menuButton)} onClick={openMenu}>
          <span className={cn.menuIcon} />
        </button>
        <Popper isOpen={isOpenMenu} closeMenu={closeMenu} position="right">
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
