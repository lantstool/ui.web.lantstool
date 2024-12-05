import { FormDropdown } from '../../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { Form } from '../../_general/Form/Form.jsx';
import { BlockTarget } from '../../_general/BlockTarget/BlockTarget.jsx';
import { MethodDescription } from '../../_general/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/ConfigureTitle/ConfiguresTitle.jsx';
import { Tooltip } from '../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { schema } from './schema.js';

export const GetContractWasm = ({ call, draft }) => {
  const options = useAccountsOptions();
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description="Provides general account details, including creation date, associated keys, and possibly the contract’s state."
          link="https://docs.near.org/api/rpc/contracts#view-contract-code"
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
      <BlockTarget />
    </Form>
  );
};
