import { Dropdown } from '../../../../../../../_general/Dropdown/Dropdown.jsx';
import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { Form } from '../_general/Form/Form.jsx';
import { Input } from '../../../../../../../_general/Input/Input.jsx';
import { WaitUntil } from './_general/WaitUntil.jsx';

export const GetDetailedTransaction = ({ call, draft }) => {
  const options = useAccountsOptions();
  return (
    <Form call={call} draft={draft}>
      <Input name="transactionHash" label="Transaction Hash" />
      <Dropdown
        name="signerId"
        label="Signer Id"
        options={options}
        isSearchable
        isClearable
        creatableSelect
      />
      <WaitUntil />
    </Form>
  );
};
