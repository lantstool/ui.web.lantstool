import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from '../general/FormGroup/FormGroup.jsx';
import { ContractId } from '../general/ContractId/ContractId.jsx';

const getFormValues = (call) => ({
  callId: call.callId,
  type: call.type,
  method: call.method,
  params: {
    finality: call.params.finality,
    account_id: call.params.account_id,
    request_type: call.params.request_type,
  },
  results: call.results,
});

export const ViewAccount = ({ call }) => {
  const formDefaultValues = useMemo(() => getFormValues(call), [call.callId]);

  const form = useForm({
    defaultValues: formDefaultValues,
  });

  return (
    <FormGroup form={form} call={call} formDefaultValues={formDefaultValues}>
      <ContractId form={form} />
    </FormGroup>
  );
};
