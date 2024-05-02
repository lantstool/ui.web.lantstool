import cn from './Popup.module.css';
import cnm from 'classnames';
import { useMemo } from 'react';

const popupPosition: any = {
  bottomRight: { popup: cn.positionRight, arrow: cn.arrowRight },
  bottomLeft: { popup: cn.positionLeft, arrow: cn.arrowLeft },
  bottomCenter: { popup: cn.positionCenter, arrow: cn.arrowCenter },
};

const getType = (position: any) => popupPosition[position] || popupPosition.center;
export const Popup = ({ items, isOpen, handleMenuItemClick, closeMenu, position }: any) => {
  const { popup, arrow } = useMemo(() => getType(position), [position]);

  return (
    <>
      {isOpen && (
        <>
          <div className={cnm(cn.popup, popup)}>
            <div className={cnm(cn.arrow, arrow)} />
            <div className={cn.buttonWrapper}>
              {items.map((network: any) => (
                <button
                  key={network.networkId}
                  className={cn.button}
                  onClick={() => handleMenuItemClick(network.networkId)}
                >
                  <p className={cn.buttonText}>{network.networkId}</p>
                </button>
              ))}
            </div>
          </div>
          <div className={cn.backdrop} onClick={()=>closeMenu()}/>
        </>
      )}
    </>
  );
};
