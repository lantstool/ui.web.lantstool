import { BlockTarget } from '../_general/BlockTarget/BlockTarget.jsx';
import { useFieldsDefaultValues } from '../_general/hooks/useFieldsDefaultValues.js';
import { ContractId } from './ContractId/ContractId.jsx';
import { MethodName } from './MethodName/MethodName.jsx';
import { Arguments } from './Arguments/Arguments.jsx';

export const CallContractViewMethod = ({ form }) => {
  useFieldsDefaultValues(form, {
    contractId: '',
    methodName: '',
    args: '',
    blockTarget: 'latest',
    finality: { value: 'final', label: 'Final' },
    blockId: '',
  });

  return (
    <>
      <ContractId form={form} />
      <MethodName form={form} />
      <Arguments form={form} />
      <BlockTarget form={form} />
    </>
  );
};
