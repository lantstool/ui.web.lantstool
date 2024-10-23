import { useFieldsDefaultValues } from '../../_general/hooks/useFieldsDefaultValues.js';
import { ContractId } from './ContractId/ContractId.jsx';
import { MethodName } from './MethodName/MethodName.jsx';
import { Arguments } from './Arguments/Arguments.jsx';

export const CallContractViewMethod = ({ form }) => {
  useFieldsDefaultValues(form, { contractId: '', args: '{}' });

  return (
    <>
      <ContractId form={form} />
      {/*<MethodName form={form} />*/}
      <Arguments form={form} />
    </>
  );
};
