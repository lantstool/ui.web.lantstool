import { Dropdown } from '../../../../../../../../../_general/Dropdown/Dropdown.jsx';
import { useAccountsOptions } from '../../../../../../_general/hooks/useAccountsOptions.js';

export const ContractId = ({ control }) => {
  const options = useAccountsOptions();
  return (
    <Dropdown
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
