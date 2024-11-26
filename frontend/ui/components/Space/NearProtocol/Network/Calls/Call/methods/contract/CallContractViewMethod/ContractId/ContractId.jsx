import { FormDropdown } from '../../../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../../../_general/hooks/useAccountsOptions.js';

export const ContractId = ({ control }) => {
  const options = useAccountsOptions();
  return (
    <FormDropdown
      name="contractId"
      label="Contract Id"
      control={control}
      options={options}
      isSearchable
      isClearable
      creatableSelect
    />
  );
};
