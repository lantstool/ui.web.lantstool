import cn from './Popup.module.css';
import cnm from 'classnames';
import { useMemo } from 'react';

const popupPosition: any = {
  right: { popup: cn.positionRight, triangle: cn.triangleRight },
  left: { popup: cn.positionLeft, triangle: cn.triangleLeft },
  center: { popup: cn.positionCenter, triangle: cn.triangleCenter },
};

const getType = (position: any) => popupPosition[position] || popupPosition.center;
export const Popup = ({ isOpen, openModal, duplicate, handleClose, position }: any) => {
  const { popup, triangle } = useMemo(() => getType(position), [position]);

  return (
    <>
      {isOpen && (
        <>
          <div className={cnm(cn.popup, popup)}>
            <div className={cnm(cn.triangle, triangle)} />
            <div className={cn.buttonWrapper}>
              <button className={cn.button} onClick={() => openModal('editModal')}>
                <p className={cn.buttonText}>Edit name</p>
              </button>
              {duplicate && (
                <button className={cn.button} onClick={duplicate}>
                  <p className={cn.buttonText}>Duplicate</p>
                </button>
              )}
              <button className={cn.button} onClick={() => openModal('deleteModal')}>
                <p className={cn.buttonText}>Remove</p>
              </button>
            </div>
          </div>
          <div className={cn.backdrop} onClick={handleClose} />
        </>
      )}
    </>
  );
};
