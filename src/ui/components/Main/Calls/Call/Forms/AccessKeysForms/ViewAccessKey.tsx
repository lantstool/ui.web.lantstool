import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from '../general/FormGroup/FormGroup.tsx';
import { ContractId } from '../general/ContractId/ContractId.tsx';
import { SignerKey } from '../general/SignerKey/SignerKey.tsx';

const getFormValues = (call: any) => ({
  callId: call.callId,
  type: call.type,
  method: call.method,
  params: {
    finality: call.params.finality,
    account_id: call.params.account_id,
    request_type: call.params.request_type,
    public_key: call.params.public_key,
  },
  results: call.results,
});

export const ViewAccessKey = ({ call }: any) => {
  const formDefaultValues: any = useMemo(() => getFormValues(call), [call.callId]);

  const form = useForm({
    defaultValues: formDefaultValues,
  });

  return (
    <FormGroup form={form} call={call} formDefaultValues={formDefaultValues}>
      <ContractId form={form} />
      <SignerKey form={form} />
    </FormGroup>
  );
};
