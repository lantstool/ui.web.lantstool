import { Dropdown } from '../../../../../../../../_general/Dropdown/Dropdown.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';

export const ContractId = ({ form }) => {
  const { control } = form;
  const options = useAccountsOptions();

  return (
    <Dropdown
      name="params.contractId"
      label="Contract Id"
      control={control}
      options={options}
      isSearchable
      isClearable
      creatableSelect
    />
  );
};
