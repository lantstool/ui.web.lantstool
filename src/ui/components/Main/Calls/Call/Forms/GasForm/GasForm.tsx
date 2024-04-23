import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from '../general/FormGroup/FormGroup.tsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.tsx';

const getFormValues = (call: any) => ({
  callId: call.callId,
  type: call.type,
  method: call.method,
  params: call.params,
  results: call.results,
});

export const GasForm = ({ call }: any) => {
  const formDefaultValues: any = useMemo(() => getFormValues(call), [call.callId]);

  const form = useForm({
    defaultValues: formDefaultValues,
  });

  return (
    <FormGroup form={form} call={call} formDefaultValues={formDefaultValues}>
      <InputGroup
        register={form.register}
        label="Block - Height / Hash / null"
        name="params.value"
      />
    </FormGroup>
  );
};
