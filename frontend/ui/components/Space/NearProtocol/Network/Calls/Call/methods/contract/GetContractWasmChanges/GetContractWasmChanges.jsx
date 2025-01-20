import { BlockTarget } from '../../_general/components/BlockTarget/BlockTarget.jsx';
import { Form } from '../../_general/components/Form/Form.jsx';
import { ContractIds } from '../../_general/components/ContractIds/ContractIds.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const GetContractWasmChanges = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description={
            <>
              Returns the modifications made to a contract’s code in a specific block. Changes for
              multiple accounts can be retrieved simultaneously.
            </>
          }
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
