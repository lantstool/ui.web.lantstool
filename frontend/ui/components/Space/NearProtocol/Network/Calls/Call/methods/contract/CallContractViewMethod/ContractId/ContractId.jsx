import { FormDropdown } from '../../../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../../../_general/hooks/useAccountsOptions.js';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';

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
      tooltip={<Tooltip content="Contract id" placement="top" defaultContent />}
    />
  );
};
