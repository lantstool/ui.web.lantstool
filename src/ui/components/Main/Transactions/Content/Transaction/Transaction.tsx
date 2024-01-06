import { Topbar } from './Topbar/Topbar.tsx';
import { Body } from './Body/Body.tsx';
import cn from './Transaction.module.css';

export const Transaction = ({ transaction }: any) => {
  return (
    <div className={cn.transaction}>
      <Topbar transaction={transaction} />
      <Body transaction={transaction} />
    </div>
  );
};
