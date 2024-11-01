import { useStoreState } from '@react-vault';
import { useEffect, useState } from 'react';
import { FormSelectGroup } from '../../../../../../../../../_general/FormSelectGroup/FormSelectGroup.jsx';
import { useWatch } from 'react-hook-form';

const getOptions = async (accounts, setOptions) => {
  const options = accounts.map((account) => ({
    value: account,
    label: account,
  }));
  setOptions(options);
};

export const ContractId = ({ form }) => {
  const { control, setValue } = form;

  const accounts = useStoreState((state) => state.accounts.ids);
  const [options, setOptions] = useState([]);
  // TODO: move useWatch into BalanceLabel
  const contractId = useWatch({ control, name: 'params.account_id.value' });

  useEffect(() => {
    getOptions(accounts, setOptions);
  }, []);

  const onChange = (field) => (event) => {
    field.onChange(event);
    setValue('params.method_name', '');
  };

  return (
    <FormSelectGroup
      name="params.account_id"
      accountId={contractId}
      label="Contract Id"
      control={control}
      options={options}
      onChange={onChange}
      isSearchable={true}
      isClearable={true}
      creatableSelect={true}
    />
  );
};
