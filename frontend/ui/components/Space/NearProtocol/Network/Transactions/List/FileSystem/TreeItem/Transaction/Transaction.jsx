import { NavLink, useParams } from 'react-router-dom';
import { Menu } from './Menu/Menu.jsx';
import { EditName } from '../../../../../_general/EditName/EditName.jsx';
import { useStoreEffect } from '@react-vault';
import cnm from 'classnames';
import cn from './Transaction.module.scss';

export const Transaction = ({ item, wrapperProps }) => {
  const updateOneName = useStoreEffect((store) => store.nearProtocol.transactions.updateOneName);
  const { transactionId } = useParams();
  const isActive = item?.transactionId === transactionId && transactionId;

  const { depth } = wrapperProps;

  const updateName = (formValues) => {
    updateOneName({ formValues, transactionId: item?.transactionId });
  };

  return (
    <>
      <NavLink
        to={item.transactionId}
        className={cnm(cn.transaction, depth === 1 && cn.children, isActive && cn.active)}
      >
        <EditName
          name={item.name}
          itemId={item.transactionId}
          updateName={updateName}
          styles={cn.editName}
        />
        <Menu item={item} />
      </NavLink>
    </>
  );
};
