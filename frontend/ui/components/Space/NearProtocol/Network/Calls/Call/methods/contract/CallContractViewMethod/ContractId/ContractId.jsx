import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../../../_general/hooks/useAccountsOptions.js';
import { useStoreAction } from '@react-vault';

export const ContractId = ({ control, form }) => {
  const options = useAccountsOptions();
  const setContractHash = useStoreAction((store)=> store.nearProtocol.contractAbi.setContractHash)

  const onChange = (field) => (event) => {
    if (field.value?.value === event?.value) return
    field.onChange(event);
    form.setValue('methodName', null);
    form.setValue('args', '');
    setContractHash(null)
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
