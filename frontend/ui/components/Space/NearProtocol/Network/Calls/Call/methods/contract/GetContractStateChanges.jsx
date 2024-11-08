import { Input } from '../../../../../../../_general/Input/Input.jsx';
import { ContractIds } from '../_general/ContractIds/ContractIds.jsx';
import { Form } from '../_general/Form/Form.jsx';
import { BlockTarget } from '../_general/BlockTarget/BlockTarget.jsx';

export const GetContractStateChanges = ({ call, draft }) => {
  // TODO add custom validation for the form
  return (
    <Form call={call} draft={draft}>
      <ContractIds contractIds={draft.contractIds} />
      <Input name="keyPrefix" label="State Prefix" />
      <BlockTarget />
    </Form>
  );
};
