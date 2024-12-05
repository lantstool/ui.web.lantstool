import { BlockTarget } from '../../_general/BlockTarget/BlockTarget.jsx';
import { Form } from '../../_general/Form/Form.jsx';
import { ContractIds } from '../../_general/ContractIds/ContractIds.jsx';
import { MethodDescription } from '../../_general/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const GetContractWasmChanges = ({ call, draft }) => {
  // TODO add custom validation for the form
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description="Provides general account details, including creation date, associated keys, and possibly the contract’s state."
          link="https://docs.near.org/api/rpc/contracts#view-contract-code-changes"
        />
      }
    >
      <ConfigureTitle />
      <ContractIds contractIds={draft.contractIds} />
      <BlockTarget />
    </Form>
  );
};
