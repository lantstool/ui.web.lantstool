import cnm from 'classnames';
import { useMemo } from 'react';
import { Duplicate } from './Duplicate/Duplicate.jsx';
import cn from './Menu.module.scss';

const popupPosition = {
  bottomRight: { popup: cn.positionRight, arrow: cn.arrowRight },
  bottomLeft: { popup: cn.positionLeft, arrow: cn.arrowLeft },
  bottomCenter: { popup: cn.positionCenter, arrow: cn.arrowCenter },
};

const getType = (position) => popupPosition[position] || popupPosition.center;

export const Menu = ({ openEditModal, openRemoveModal, closeMenu, position }) => {
  const { popup, arrow } = useMemo(() => getType(position), [position]);

  return (
    <>
      <div className={cnm(cn.popup, popup)}>
        <div className={cnm(cn.arrow, arrow)} />
        <div className={cn.buttonWrapper}>
          <button className={cn.button} onClick={openEditModal}>
            <p className={cn.buttonText}>Edit name</p>
          </button>
          <Duplicate closeMenu={closeMenu} />
          <button className={cn.button} onClick={openRemoveModal}>
            <p className={cn.buttonText}>Remove</p>
          </button>
        </div>
      </div>
      <div className={cn.backdrop} onClick={closeMenu} />
    </>
  );
};
