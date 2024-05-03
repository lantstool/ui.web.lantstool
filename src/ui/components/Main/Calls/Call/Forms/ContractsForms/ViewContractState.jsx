import { FormGroup } from '../general/FormGroup/FormGroup.jsx';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ContractId } from '../general/ContractId/ContractId.jsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.jsx';

const getFormValues = (call) => ({
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

export const ViewContractState = ({ call }) => {
  const formDefaultValues = useMemo(() => getFormValues(call), [call.callId]);

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
