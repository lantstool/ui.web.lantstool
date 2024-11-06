import { Dropdown } from '../../../../../../../_general/Dropdown/Dropdown.jsx';
import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { BlockTarget } from '../_general/BlockTarget/BlockTarget.jsx';
import { Form } from '../_general/Form/Form.jsx';

const Fields = ({ form }) => {
  const options = useAccountsOptions();
  return (
    <>
      <Dropdown
        name="accountId"
        label="Account Id"
        control={form.control}
        options={options}
        isSearchable
        isClearable
        creatableSelect
      />
      <BlockTarget form={form} />
    </>
  );
};

export const GetAccount = ({ call, draft }) => {
  return (
    <Form call={call} draft={draft}>
      <Fields />
    </Form>
  );
};
