import { FormDropdown } from '../../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { Input } from '../../../../../../../../_general/Input/Input.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { Form } from '../../_general/components/Form/Form.jsx';
import { BlockTarget } from '../../_general/components/BlockTarget/BlockTarget.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { Tooltip } from '../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { schema } from './schema.js';

export const GetContractState = ({ call, draft }) => {
  const options = useAccountsOptions();
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description="Provides general account details, including creation date, associated keys, and possibly the contract’s state."
          link="https://docs.near.org/api/rpc/contracts#view-contract-state"
        />
      }
    >
      <ConfigureTitle />
      <FormDropdown
        name="contractId"
        label="Contract Id"
        options={options}
        isSearchable
        isClearable
        creatableSelect
        tooltip={<Tooltip content="Contract id" placement="top" defaultContent />}
      />
      <Input
        name="keyPrefix"
        label="State Prefix"
        tooltip={<Tooltip content="State prefix" placement="top" defaultContent />}
      />
      <BlockTarget />
    </Form>
  );
};
