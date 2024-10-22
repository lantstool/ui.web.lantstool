import { Dropdown } from '../../../../../../../_general/Dropdown/Dropdown.jsx';
import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { useFieldsDefaultValues } from '../_general/hooks/useFieldsDefaultValues.js';

export const GetAccountData = ({ form }) => {
  const { control } = form;
  const options = useAccountsOptions();

  useFieldsDefaultValues(form, { accountId: '' });

  return (
    <Dropdown
      name="params.accountId"
      label="Account Id"
      control={control}
      options={options}
      isSearchable
      isClearable
      creatableSelect
    />
  );
};
