import { useStoreState } from '../../../../../../../react-vault';
import { useEffect, useState } from 'react';
import { FormSelectGroup } from '../../../../../general/FormSelectGroup/FormSelectGroup.tsx';
import { useWatch } from 'react-hook-form';

const getOptions: any = async (accounts: any, setOptions: any) => {
  const options = accounts.map((account: any) => ({
    value: account,
    label: account,
  }));
  setOptions(options);
};

export const ContractId = ({ form }: any) => {
  const { control, setValue } = form;
  const accounts = useStoreState((state: any) => state.accounts.ids);
  const [options, setOptions] = useState([]);
  const contractId = useWatch({ control, name: 'contractId.value' });

  useEffect(() => {
    getOptions(accounts, setOptions);
  }, []);

  const onChange = (field: any) => (event: any) => {
    field.onChange(event);
    setValue('method', '');
  };

  return (
    <FormSelectGroup
      name="contractId"
      accountId={contractId}
      onChange={onChange}
      label="Contract Id"
      control={control}
      options={options}
      isSearchable={true}
      isClearable={true}
      creatableSelect={true}
    />
  );
};
