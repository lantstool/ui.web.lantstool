import cn from './Popup.module.css';
import cnm from 'classnames';
import { useMemo } from 'react';

const popupPosition = {
  bottomRight: { popup: cn.positionRight, arrow: cn.arrowRight },
  bottomLeft: { popup: cn.positionLeft, arrow: cn.arrowLeft },
  bottomCenter: { popup: cn.positionCenter, arrow: cn.arrowCenter },
};

const getType = (position) => popupPosition[position] || popupPosition.center;
export const Popup = ({ isOpen, openModal, duplicate, handleClose, position }) => {
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
