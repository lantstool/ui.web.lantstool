import { Popper } from '@gc/Popper/Popper.jsx';
import cnm from 'classnames';
import cn from './ItemPopperMenu.module.scss';

export const ItemPopperMenu = ({
  isOpenMenu,
  closeMenu,
  anchorRef,
  duplicate,
  openExport,
  openEditMode,
  openMenu,
  openDelete,
}) => {
  return (
    <>
      <button
        ref={anchorRef}
        className={cnm(cn.menuButton, isOpenMenu && cn.activeBtn)}
        onClick={openMenu}
      >
        <span className={cn.menuIcon} />
      </button>
      <Popper
        isOpen={isOpenMenu}
        closeMenu={closeMenu}
        position="left"
        anchorEl={anchorRef.current}
      >
        <div className={cn.container}>
          <button className={cn.duplicateButton} onClick={duplicate}>
            <span className={cn.duplicateIcon} />
            <p className={cn.title}>Duplicate</p>
          </button>
          <button className={cn.folderButton} onClick={openExport}>
            <span className={cn.exportIcon} />
            <p className={cn.title}>Export</p>
          </button>
          <button className={cn.renameButton} onClick={openEditMode}>
            <span className={cn.renameIcon} />
            <div className={cn.titleWrapper}>
              <p className={cn.title}>Rename</p>
              <p className={cn.subtitle}>Ctrl + Q</p>
            </div>
          </button>
          <button className={cn.folderButton} onClick={openDelete}>
            <span className={cn.deleteIcon} />
            <p className={cn.title}>Delete</p>
          </button>
        </div>
      </Popper>
    </>
  );
};
