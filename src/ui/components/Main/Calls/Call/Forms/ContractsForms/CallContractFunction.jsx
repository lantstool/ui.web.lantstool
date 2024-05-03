import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from '../general/FormGroup/FormGroup.jsx';
import { ContractId } from '../general/ContractId/ContractId.jsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.jsx';
import { TextareaGroup } from '../../../../../general/TextareaGroup/TextareaGroup.jsx';

const getFormValues = (call) => ({
  callId: call.callId,
  type: call.type,
  method: call.method,
  params: {
    finality: call.params.finality,
    account_id: call.params.account_id,
    request_type: call.params.request_type,
    method_name: call.params.method_name,
    args_base64: call.params.args_base64,
  },
  results: call.results,
});

export const CallContractFunction = ({ call }) => {
  const formDefaultValues = useMemo(() => getFormValues(call), [call.callId]);

  const form = useForm({
    defaultValues: formDefaultValues,
  });

  return (
    <FormGroup form={form} call={call} formDefaultValues={formDefaultValues}>
      <ContractId form={form} />
      <InputGroup register={form.register} name="params.method_name" label="Method name" />
      <TextareaGroup
        register={form.register}
        name="params.args_base64"
        label="Args base64"
        rows={10}
      />
    </FormGroup>
  );
};
