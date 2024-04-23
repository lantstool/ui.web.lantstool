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
    changes_type: call.params.changes_type,
    account_id: call.params.account_id,
    public_key: call.params.public_key,
  },
  results: call.results,
});

export const ViewAccessKeyChangesSingle = ({ call }: any) => {
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
