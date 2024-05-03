import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from '../general/FormGroup/FormGroup.jsx';
import { SelectSearchType } from '../general/SelectSearchType/SelectSearchType.jsx';

const getFormValues = (call) => ({
  callId: call.callId,
  type: call.type,
  method: call.method,
  params: {
    type: call.params.type,
    finality: call.params.finality,
    block_id: call.params.block_id,
  },
  results: call.results,
});

export const ProtocolConfig = ({ call }) => {
  const formDefaultValues = useMemo(() => getFormValues(call), [call.callId]);

  const form = useForm({
    defaultValues: formDefaultValues,
  });

  return (
    <FormGroup form={form} call={call} formDefaultValues={formDefaultValues}>
      <SelectSearchType form={form} />
    </FormGroup>
  );
};
