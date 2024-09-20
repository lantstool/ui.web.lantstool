import { InputGroup } from '../../../../../../../general/InputGroup/InputGroup.jsx';
import { WaitUntil } from '../general/WaitUntil/WaitUntil.jsx';

export const TransactionStatusWithReceipts = ({ form }) => (
  <>
    <InputGroup register={form.register} label="Transaction hash" name="params.tx_hash" />
    <InputGroup
      register={form.register}
      label="Sender account id"
      name="params.sender_account_id"
    />
    <WaitUntil form={form} />
  </>
);
