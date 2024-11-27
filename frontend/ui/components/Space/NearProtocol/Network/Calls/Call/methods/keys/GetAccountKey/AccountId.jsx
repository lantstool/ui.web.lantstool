import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { FormDropdown } from '../../../../../../../../_general/FormDropdown/FormDropdown.jsx';

export const AccountId = ({ form, control }) => {
  const options = useAccountsOptions();

  const onChange = (field) => (event) => {
    field.onChange(event);
    form.setValue('publicKey', null);
  };

  return (
    <FormDropdown
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
