import { Input } from '../../../../../../../../_general/Input/Input.jsx';
import { ContractIds } from '../../_general/ContractIds/ContractIds.jsx';
import { Form } from '../../_general/Form/Form.jsx';
import { BlockTarget } from '../../_general/BlockTarget/BlockTarget.jsx';
import { MethodDescription } from '../../_general/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/ConfigureTitle/ConfiguresTitle.jsx';
import { Tooltip } from '../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { schema } from './schema.js';

export const GetContractStateChanges = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description="Provides general account details, including creation date, associated keys, and possibly the contract’s state."
          link="https://docs.near.org/api/rpc/contracts#view-contract-state-changes"
        />
      }
    >
      <ConfigureTitle />
      <ContractIds contractIds={draft.contractIds} />
      <Input
        name="keyPrefix"
        label="State Prefix"
        tooltip={<Tooltip content="State prefix" placement="top" defaultContent />}
      />
      <BlockTarget />
    </Form>
  );
};
