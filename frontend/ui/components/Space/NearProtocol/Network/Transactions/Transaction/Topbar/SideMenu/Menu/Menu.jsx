import { useNavigate } from 'react-router-dom';
import {
  useStoreEffect
} from '../../../../../../../../../../../react-vault/index.js';
import cn from './Menu.module.scss';
import cnm from 'classnames';
import { useMemo } from 'react';

const popupPosition = {
  bottomRight: { popup: cn.positionRight, arrow: cn.arrowRight },
  bottomLeft: { popup: cn.positionLeft, arrow: cn.arrowLeft },
  bottomCenter: { popup: cn.positionCenter, arrow: cn.arrowCenter },
};

const getType = (position) => popupPosition[position] || popupPosition.center;

export const Menu = ({ openEditModal, openRemoveModal, closeMenu, position }) => {
  const navigate = useNavigate();
  const onDuplicateTransaction = useStoreEffect(
    (store) => store.nearProtocol.transactions.onDuplicateTransaction,
  );
  const { popup, arrow } = useMemo(() => getType(position), [position]);

  const duplicateTx = () => {};

  return (
    <>
      <div className={cnm(cn.popup, popup)}>
        <div className={cnm(cn.arrow, arrow)} />
        <div className={cn.buttonWrapper}>
          <button className={cn.button} onClick={openEditModal}>
            <p className={cn.buttonText}>Edit name</p>
          </button>
          <button className={cn.button} onClick={duplicateTx}>
            <p className={cn.buttonText}>Duplicate</p>
          </button>
          <button className={cn.button} onClick={openRemoveModal}>
            <p className={cn.buttonText}>Remove</p>
          </button>
        </div>
      </div>
      <div className={cn.backdrop} onClick={closeMenu} />
    </>
  );
};
