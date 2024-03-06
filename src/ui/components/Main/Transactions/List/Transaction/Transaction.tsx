import { NavLink } from 'react-router-dom';
import cnm from 'classnames';
import cn from './Transaction.module.css';

export const Transaction = ({ transaction, isActive }: any) => {
  return (
    <NavLink
      to={transaction.transactionId}
      className={cnm(cn.container, isActive && cn.active)}
    >
      <p className={cn.title}>{transaction.name}</p>
    </NavLink>
  );
};
