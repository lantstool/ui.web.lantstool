import { TransactionStatus } from './TransactionStatus.jsx';
import { TransactionStatusWithReceipts } from './TransactionStatusWithReceipts.jsx';
import { ReceiptById } from './ReceiptById.jsx';

export const TransactionsForms = ({ form, type }) => (
  <>
    {type === 'tx' && <TransactionStatus form={form} />}
    {type === 'EXPERIMENTAL_tx_status' && <TransactionStatusWithReceipts form={form} />}
    {type === 'EXPERIMENTAL_receipt' && <ReceiptById form={form} />}
  </>
);
