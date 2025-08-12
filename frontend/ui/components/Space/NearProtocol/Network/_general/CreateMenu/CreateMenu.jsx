import { useStoreEffect } from '@react-vault';
import { useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Popper } from '@gc/Popper/Popper.jsx';
import { Button } from '@gc/Button/Button.jsx';
import cn from './CreateMenu.module.scss';

export const CreateMenu = ({ children, type, text, create }) => {
  const { spaceId, networkId } = useParams();
  const createOneFolder = useStoreEffect((store) => store.nearProtocol.folders.createOne);
  const [isOpen, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  const createOne = () => {
    create();
    closeMenu();
  };

  const createFolder = () => {
    createOneFolder({ spaceId, networkId, type });
    closeMenu();
  };

  return (
    <div className={cn.createMenu} ref={anchorRef}>
      <Button iconLeftStyles={cn.addIcon} size={'medium'} color="tertiary" onClick={openMenu}>
        Create
      </Button>
      <Popper isOpen={isOpen} closeMenu={closeMenu} position="right" anchorEl={anchorRef.current}>
        <div className={cn.container}>
          <button className={cn.createOneButton} onClick={createOne}>
            {children}
            <p className={cn.title}>Create {text}</p>
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
