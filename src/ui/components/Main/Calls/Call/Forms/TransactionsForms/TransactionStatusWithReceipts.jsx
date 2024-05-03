import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from '../general/FormGroup/FormGroup.jsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.jsx';
import { WaitUntil } from '../general/WaitUntil/WaitUntil.jsx';

const getFormValues = (call) => ({
  callId: call.callId,
  type: call.type,
  method: call.method,
  params: {
    tx_hash: call.params.tx_hash,
    sender_account_id: call.params.sender_account_id,
    wait_until: call.params.wait_until,
  },
  results: call.results,
});

export const TransactionStatusWithReceipts = ({ call }) => {
  const formDefaultValues = useMemo(() => getFormValues(call), [call.callId]);

  const form = useForm({
    defaultValues: formDefaultValues,
  });

  return (
    <FormGroup form={form} call={call} formDefaultValues={formDefaultValues}>
      <InputGroup register={form.register} label="Transaction hash" name="params.tx_hash" />
      <InputGroup
        register={form.register}
        label="Sender account id"
        name="params.sender_account_id"
      />
      <WaitUntil form={form} />
    </FormGroup>
  );
};
