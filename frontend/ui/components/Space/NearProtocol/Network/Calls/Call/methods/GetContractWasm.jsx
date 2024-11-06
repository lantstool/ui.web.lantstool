import { Dropdown } from '../../../../../../_general/Dropdown/Dropdown.jsx';
import { useAccountsOptions } from '../../../_general/hooks/useAccountsOptions.js';
import { Form } from './_general/Form/Form.jsx';
import { BlockTarget } from './_general/BlockTarget/BlockTarget.jsx';

export const GetContractWasm = ({ call, draft }) => {
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
      <BlockTarget />
    </Form>
  );
};
