import { NavLink } from 'react-router-dom';
import cnm from 'classnames';
import cn from './Transaction.module.css';

export const Transaction = ({ transaction, isActive }: any) => {
  return (
    <NavLink
      to={`/transactions/${transaction.transactionId}`}
      className={cnm(cn.container, isActive && cn.active)}
    >
      {transaction.name}
    </NavLink>
  );
};
