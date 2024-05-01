import { TransactionStatus } from './TransactionStatus.tsx';
import { TransactionStatusWithReceipts } from './TransactionStatusWithReceipts.tsx';
import { ReceiptById } from './ReceiptById.tsx';

export const TransactionsForms = ({ call }: any) => (
  <>
    {call.type === 'tx' && <TransactionStatus call={call} />}
    {call.type === 'EXPERIMENTAL_tx_status' && <TransactionStatusWithReceipts call={call} />}
    {call.type === 'EXPERIMENTAL_receipt' && <ReceiptById call={call} />}
  </>
);
