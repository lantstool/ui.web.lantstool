import { Popper } from '@gc/Popper/Popper.jsx';
import { NavLink, useParams } from 'react-router-dom';
import { Menu } from './Menu/Menu.jsx';
import { useToggler } from '@hooks/useToggler.js';
import { EditName } from '../_general/EditName/EditName.jsx';
import { useStoreEffect } from '@react-vault';
import cnm from 'classnames';
import cn from './Transaction.module.scss';

export const Transaction = ({ item, wrapperProps }) => {
  const updateOneName = useStoreEffect((store) => store.nearProtocol.transactions.updateOneName);
  const { transactionId } = useParams();
  const isActive = item?.transactionId === transactionId && transactionId;
  const [isOpenMenu, openMenu, closeMenu] = useToggler(false);
  const { depth } = wrapperProps;

  const updateName = (formValues) => {
    updateOneName({ formValues, transactionId: item?.transactionId });
  };

  return (
    <>
      <NavLink
        to={item.transactionId}
        className={cnm(cn.link, depth === 1 && cn.children, isActive && cn.active)}
      >
        <EditName
          name={item.name}
          itemId={item.transactionId}
          updateName={updateName}
          styles={depth === 1 ? cn.shortTitle : cn.title}
        />
        <Menu item={item} isOpenMenu={isOpenMenu} openMenu={openMenu} closeMenu={closeMenu} />
      </NavLink>
      <Popper />
    </>
  );
};
