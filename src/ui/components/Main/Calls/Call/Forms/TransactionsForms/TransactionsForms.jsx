import { TransactionStatus } from './TransactionStatus.jsx';
import { TransactionStatusWithReceipts } from './TransactionStatusWithReceipts.jsx';
import { ReceiptById } from './ReceiptById.jsx';

export const TransactionsForms = ({ call }) => (
  <>
    {call.type === 'tx' && <TransactionStatus call={call} />}
    {call.type === 'EXPERIMENTAL_tx_status' && <TransactionStatusWithReceipts call={call} />}
    {call.type === 'EXPERIMENTAL_receipt' && <ReceiptById call={call} />}
  </>
);
