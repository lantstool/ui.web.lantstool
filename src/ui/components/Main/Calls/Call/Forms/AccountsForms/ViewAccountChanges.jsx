import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from '../general/FormGroup/FormGroup.jsx';
import { ContractIds } from '../general/ContractIds/ContractIds.jsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.jsx';

const getFormValues = (call) => ({
  callId: call.callId,
  type: call.type,
  method: call.method,
  params: {
    changes_type: call.params.changes_type,
    account_ids: call.params.account_ids,
    block_id: call.params.block_id,
  },
  results: call.results,
});

export const ViewAccountChanges = ({ call }) => {
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
