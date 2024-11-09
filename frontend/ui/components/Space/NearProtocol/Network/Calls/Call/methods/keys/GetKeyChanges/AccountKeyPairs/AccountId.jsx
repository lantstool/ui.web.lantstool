import { useAccountsOptions } from '../../../../../../_general/hooks/useAccountsOptions.js';
import { Dropdown } from '../../../../../../../../../_general/Dropdown/Dropdown.jsx';

export const AccountId = ({ form, control }) => {
  const options = useAccountsOptions();

  const onChange = (field) => (event) => {
    field.onChange(event);
    form.setValue('publicKey', null);
  };

  return (
    <Dropdown
      name="accountId"
      label="Account Id"
      control={control}
      options={options}
      onChange={onChange}
      isSearchable
      isClearable
      creatableSelect
    />
  );
};
