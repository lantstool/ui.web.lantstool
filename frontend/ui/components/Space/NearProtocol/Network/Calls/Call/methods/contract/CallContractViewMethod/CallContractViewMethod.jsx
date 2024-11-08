import { BlockTarget } from '../../_general/BlockTarget/BlockTarget.jsx';
import { ContractId } from './ContractId/ContractId.jsx';
import { MethodName } from './MethodName/MethodName.jsx';
import { Arguments } from './Arguments/Arguments.jsx';
import { Form } from '../../_general/Form/Form.jsx';

export const CallContractViewMethod = ({ call, draft }) => {
  // TODO add custom validation for the form
  return (
    <Form call={call} draft={draft}>
      <ContractId />
      <MethodName />
      <Arguments />
      <BlockTarget />
    </Form>
  );
};
