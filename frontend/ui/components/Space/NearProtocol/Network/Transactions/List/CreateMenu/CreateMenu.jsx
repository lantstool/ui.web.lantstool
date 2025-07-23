import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Popper } from '@gc/Popper/Popper.jsx';
import cnm from 'classnames';
import cn from './CreateMenu.module.scss';

export const CreateMenu = () => {
  const { spaceId, networkId } = useParams();
  const navigate = useNavigate();
  const createOneTransaction = useStoreEffect((store) => store.nearProtocol.transactions.create);
  const createOneFolder = useStoreEffect((store) => store.nearProtocol.folders.createOne);
  const [isOpen, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  const createTransaction = () => {
    createOneTransaction({ spaceId, networkId, navigate });
    closeMenu();
  };

  const createFolder = () => {
    createOneFolder({ spaceId, networkId, type: 'transaction' });
    closeMenu();
  };

  return (
    <div className={cn.createMenu} ref={anchorRef}>
      <button className={cnm(cn.createBtn, isOpen && cn.activeBtn)} onClick={openMenu}>
        <span className={cn.addIcon} />
        <h2 className={cn.title}>Create</h2>
      </button>
      <Popper isOpen={isOpen} closeMenu={closeMenu} position="right" anchorEl={anchorRef.current}>
        <div className={cn.container}>
          <button className={cn.txButton} onClick={createTransaction}>
            <span className={cn.transactionIcon} />
            <p className={cn.title}>Create Transaction</p>
          </button>
          <button className={cn.folderButton} onClick={createFolder}>
            <span className={cn.folderIcon} />
            <p className={cn.title}>Create Folder</p>
          </button>
        </div>
      </Popper>
    </div>
  );
};
