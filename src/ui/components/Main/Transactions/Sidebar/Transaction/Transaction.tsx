import { NavLink } from "react-router-dom";
import cnm from 'classnames';
import cn from './Transaction.module.css';

export const Transaction = ({ transaction, activeTxId, isActive }: any) => {
  // const isActive = activeTxId === id;
  // const onClick = () => setActiveTransaction(id);

  return (
    <NavLink to={`${transaction.transactionId}`} className={cnm(cn.container, isActive && cn.active)}>
      {transaction.name}
    </NavLink>
  );
};
