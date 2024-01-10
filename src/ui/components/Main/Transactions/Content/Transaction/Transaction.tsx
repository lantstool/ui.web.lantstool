import { Topbar } from './Topbar/Topbar.tsx';
import { Body } from './Body/Body.tsx';
import cn from './Transaction.module.css';

const separateData = (transaction: any) => {
  const topBarData = {
    transactionId: transaction.transactionId,
    name: transaction.name,
  };

  const bodyData = {
    transactionId: transaction.transactionId,
    signerId: transaction.signerId,
    signerKey: transaction.signerKey,
    receiver: transaction.receiver,
    actions: transaction.actions,
  };
  return { topBarData, bodyData };
};

export const Transaction = ({ transaction }: any) => {
  const { topBarData, bodyData } = separateData(transaction);

  return (
    <div className={cn.transaction}>
      <Topbar topBarData={topBarData} />
      <Body bodyData={bodyData} />
    </div>
  );
};
