import { Popper } from '@gc/Popper/Popper.jsx';
import { useRef } from 'react';
import cnm from 'classnames';
import cn from './FolderPopperMenu.module.scss';

export const FolderPopperMenu = ({ isOpenMenu, closeMenu, openEditMode, openMenu, openDelete }) => {
  const anchorRef = useRef(null);

  return (
    <div className={cn.menu} ref={anchorRef} onPointerDown={(e) => e.stopPropagation()}>
      <button className={cnm(cn.menuButton, isOpenMenu && cn.activeBtn)} onClick={openMenu}>
        <span className={cn.menuIcon} />
      </button>
      <Popper
        isOpen={isOpenMenu}
        closeMenu={closeMenu}
        position="left"
        anchorEl={anchorRef.current}
      >
        <div className={cn.container}>
          <button className={cn.renameButton} onClick={openEditMode}>
            <span className={cn.renameIcon} />
            <div className={cn.titleWrapper}>
              <p className={cn.title}>Rename</p>
              <p className={cn.subtitle}>Ctrl + Q</p>
            </div>
          </button>
          <button className={cn.deleteButton} onClick={openDelete}>
            <span className={cn.deleteIcon} />
            <p className={cn.title}>Delete</p>
          </button>
        </div>
      </Popper>
    </div>
  );
};
