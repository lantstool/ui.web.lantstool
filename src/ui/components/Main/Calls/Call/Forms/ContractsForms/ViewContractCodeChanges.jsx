import { FormGroup } from '../general/FormGroup/FormGroup.jsx';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ContractIds } from '../general/ContractIds/ContractIds.jsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.jsx';

const getFormValues = (call) => ({
  callId: call.callId,
  type: call.type,
  method: call.method,
  params: {
    block_id: call.params.block_id,
    account_ids: call.params.account_ids,
    changes_type: call.params.changes_type,
  },
  results: call.results,
});

export const ViewContractCodeChanges = ({ call }) => {
  const formDefaultValues = useMemo(() => getFormValues(call), [call.callId]);

  const form = useForm({
    defaultValues: formDefaultValues,
  });

  return (
    <FormGroup form={form} call={call} formDefaultValues={formDefaultValues}>
      <ContractIds form={form} />
      <InputGroup register={form.register} label="Block Id" name="params.block_id" />
    </FormGroup>
  );
};
