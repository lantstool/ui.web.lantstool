import { Dropdown } from '../../../../../../../_general/Dropdown/Dropdown.jsx';
import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { Form } from '../_general/Form/Form.jsx';

export const GetMaintenanceWindows = ({ call, draft }) => {
  const options = useAccountsOptions();
  // TODO add custom validation for the form
  return (
    <Form call={call} draft={draft}>
      <Dropdown
        name="validatorId"
        label="Validator Id"
        options={options}
        isSearchable
        isClearable
        creatableSelect
      />
    </Form>
  );
};
