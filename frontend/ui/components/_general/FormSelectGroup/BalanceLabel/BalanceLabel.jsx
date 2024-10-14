import { useAvailableBalance } from './useAvailableBalance.js';
import cn from './BalanceLabel.module.scss';

export const BalanceLabel = ({ accountId }) => {
  const balance = useAvailableBalance(accountId);

  if (!balance || !accountId) return;

  return (
    <div className={cn.container}>
      <p className={cn.balance}>{balance} NEAR</p>
    </div>
  );
};
