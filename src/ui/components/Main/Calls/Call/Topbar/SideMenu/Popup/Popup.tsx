import cn from './Popup.module.css';
import cnm from 'classnames';
import { useMemo } from 'react';

const popupPosition: any = {
  bottomRight: { popup: cn.positionRight, arrow: cn.arrowRight },
  bottomLeft: { popup: cn.positionLeft, arrow: cn.arrowLeft },
  bottomCenter: { popup: cn.positionCenter, arrow: cn.arrowCenter },
};

const getType = (position: any) => popupPosition[position] || popupPosition.center;
export const Popup = ({ isOpen, openModal, handleClose, position }: any) => {
  const { popup, arrow } = useMemo(() => getType(position), [position]);

  return (
    <>
      {isOpen && (
        <>
          <div className={cnm(cn.popup, popup)}>
            <div className={cnm(cn.arrow, arrow)} />
            <div className={cn.buttonWrapper}>
              <button className={cn.button} onClick={() => openModal('editModal')}>
                <p className={cn.buttonText}>Edit name</p>
              </button>
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
