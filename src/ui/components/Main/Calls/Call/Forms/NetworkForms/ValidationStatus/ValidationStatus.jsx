import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from '../../general/FormGroup/FormGroup.jsx';
import { SelectInputType } from './SelectInputType/SelectInputType.jsx';

const getFormValues = (call) => ({
  callId: call.callId,
  type: call.type,
  method: call.method,
  params: {
    type: 'block_id',
    block_id: call.params.block_id,
    epoch_id: call.params.epoch_id,
  },
  results: call.results,
});

export const ValidationStatus = ({ call }) => {
  const formDefaultValues = useMemo(() => getFormValues(call), [call.callId]);

  const form = useForm({
    defaultValues: formDefaultValues,
  });

  return (
    <FormGroup form={form} call={call} formDefaultValues={formDefaultValues}>
      <SelectInputType form={form} />
    </FormGroup>
  );
};
