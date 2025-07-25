import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../../../_general/hooks/useAccountsOptions.js';

export const ContractId = ({ control, form }) => {
  const options = useAccountsOptions();

  const onChange = (field) => (event) => {
    if (field.value?.value === event?.value) return
    field.onChange(event);
    form.setValue('methodName', null);
    form.setValue('args', '');
  };

  return (
    <FormDropdown
      name="contractId"
      label="Contract Id"
      control={control}
      options={options}
      isSearchable
      isClearable
      creatableSelect
      onChange={onChange}
    />
  );
};
