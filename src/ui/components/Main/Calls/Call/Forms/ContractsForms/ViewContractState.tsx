import { FormGroup } from '../general/FormGroup/FormGroup.tsx';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ContractId } from '../general/ContractId/ContractId.tsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.tsx';

const getFormValues = (call: any) => ({
  callId: call.callId,
  type: call.type,
  method: call.method,
  params: {
    finality: call.params.finality,
    account_id: call.params.account_id,
    request_type: call.params.request_type,
    prefix_base64: call.params.prefix_base64,
  },
  results: call.results,
});

export const ViewContractState = ({ call }: any) => {
  const formDefaultValues: any = useMemo(() => getFormValues(call), [call.callId]);

  const form = useForm({
    defaultValues: formDefaultValues,
  });

  return (
    <FormGroup form={form} call={call} formDefaultValues={formDefaultValues}>
      <ContractId form={form} />
      <InputGroup register={form.register} label="Prefix base 64" name="params.prefix_base64" />
    </FormGroup>
  );
};
