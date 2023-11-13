import cnm from 'classnames';
import cn from './Transaction.module.css';

export const Transaction = ({ transaction, activeTxId, id, setActiveTransaction }: any) => {
  const isActive = activeTxId === id;
  const onClick = () => setActiveTransaction(id);

  return (
    <div className={cnm(cn.container, isActive && cn.active)} onClick={onClick}>
      {transaction.name}
    </div>
  );
};
