import { BlockTarget } from './_general/BlockTarget/BlockTarget.jsx';
import { Form } from './_general/Form/Form.jsx';
import { ContractIds } from './_general/ContractIds/ContractIds.jsx';

export const GetContractWasmChanges = ({ call, draft }) => {
  // TODO add custom validation for the form
  return (
    <Form call={call} draft={draft}>
      <ContractIds contractIds={draft.contractIds} />
      <BlockTarget />
    </Form>
  );
};
