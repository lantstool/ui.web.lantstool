import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from '../general/FormGroup/FormGroup.tsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.jsx';

const getFormValues = (call: any) => ({
  callId: call.callId,
  type: call.type,
  method: call.method,
  params: {
    receipt_id: call.params.receipt_id,
  },
  results: call.results,
});

export const ReceiptById = ({ call }: any) => {
  const formDefaultValues: any = useMemo(() => getFormValues(call), [call.callId]);

  const form = useForm({
    defaultValues: formDefaultValues,
  });

  return (
    <FormGroup form={form} call={call} formDefaultValues={formDefaultValues}>
      <InputGroup register={form.register} label="Receipt id" name="params.receipt_id" />
    </FormGroup>
  );
};
