import cn from './Topbar.module.css';
import { SideMenu } from './SideMenu/SideMenu.jsx';
import { useMemo } from 'react';

const getFormDefaultValues = (transaction) => {
  return {
    transactionId: transaction.transactionId,
    name: transaction.name,
  };
};

export const Topbar = ({ transaction }) => {
  const formDefaultValues = useMemo(() => getFormDefaultValues(transaction), [transaction]);
  const { transactionId, name } = formDefaultValues;

  return (
    <div className={cn.topbar}>
      <h1 className={cn.name}>{name}</h1>
      <div className={cn.sideMenu}>
        {/*<SideMenu transactionId={transactionId} />*/}
      </div>
    </div>
  );
};
