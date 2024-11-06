import { Dropdown } from '../../../../../../_general/Dropdown/Dropdown.jsx';
import { Input } from '../../../../../../_general/Input/Input.jsx';
import { useAccountsOptions } from '../../../_general/hooks/useAccountsOptions.js';
import { Form } from './_general/Form/Form.jsx';
import { BlockTarget } from './_general/BlockTarget/BlockTarget.jsx';

export const GetContractState = ({ call, draft }) => {
  const options = useAccountsOptions();
  return (
    <Form call={call} draft={draft}>
      <Dropdown
        name="contractId"
        label="Contract Id"
        options={options}
        isSearchable
        isClearable
        creatableSelect
      />
      <Input name="keyPrefix"  label="State Prefix" />
      <BlockTarget />
    </Form>
  );
};
