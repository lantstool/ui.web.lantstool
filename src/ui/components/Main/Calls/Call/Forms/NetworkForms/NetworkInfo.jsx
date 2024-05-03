import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from '../general/FormGroup/FormGroup.jsx';

const getFormValues = (call) => ({
  callId: call.callId,
  type: call.type,
  method: call.method,
  params: call.params,
  results: call.results,
});

export const NetworkInfo = ({ call }) => {
  const formDefaultValues = useMemo(() => getFormValues(call), [call.callId]);

  const form = useForm({
    defaultValues: formDefaultValues,
  });

  return <FormGroup form={form} call={call} formDefaultValues={formDefaultValues} />;
};
