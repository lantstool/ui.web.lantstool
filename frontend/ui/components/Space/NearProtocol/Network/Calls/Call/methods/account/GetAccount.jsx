import { Dropdown } from '../../../../../../../_general/Dropdown/Dropdown.jsx';
import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { BlockTarget } from '../_general/BlockTarget/BlockTarget.jsx';
import { Form } from '../_general/Form/Form.jsx';

export const GetAccount = ({ call, draft }) => {
  const options = useAccountsOptions();
  // TODO add custom validation for the form
  return (
    <Form call={call} draft={draft}>
      <Dropdown
        name="accountId"
        label="Account Id"
        options={options}
        isSearchable
        isClearable
        creatableSelect
      />
      <BlockTarget />
    </Form>
  );
};
