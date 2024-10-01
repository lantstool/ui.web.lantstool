import { Link, useParams } from 'react-router-dom';
import cn from './Popup.module.scss';
import cnm from 'classnames';
import { useMemo } from 'react';

const popupPosition = {
  bottomRight: { popup: cn.positionRight, arrow: cn.arrowRight },
  bottomLeft: { popup: cn.positionLeft, arrow: cn.arrowLeft },
  bottomCenter: { popup: cn.positionCenter, arrow: cn.arrowCenter },
};

const getType = (position) => popupPosition[position] || popupPosition.center;

export const Popup = ({ items, isOpen, handleMenuItemClick, closeMenu, position }) => {
  const { popup, arrow } = useMemo(() => getType(position), [position]);
  const { spaceId, networkId } = useParams();

  if (!isOpen) return null;

  return (
    <>
      <div className={cnm(cn.popup, popup)}>
        <div className={cnm(cn.arrow, arrow)} />
        <div className={cn.buttonWrapper}>
          {items.map((network) => (
            <Link to={`/space/${spaceId}/${network.networkId}`}>{network.networkId}</Link>
            // <button
            //   key={network.networkId}
            //   className={cn.button}
            //   onClick={() => handleMenuItemClick(network.networkId)}
            // >
            //   <p className={cn.buttonText}>{network.networkId}</p>
            // </button>
          ))}
        </div>
      </div>
      <div className={cn.backdrop} onClick={() => closeMenu()} />
    </>
  );
};
