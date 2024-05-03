import { useStoreState } from '../../../../../../../../react-vault';
import { useEffect, useState } from 'react';
import { FormSelectGroup } from '../../../../../../general/FormSelectGroup/FormSelectGroup.jsx';
import { useWatch } from 'react-hook-form';

const getOptions: any = async (accounts: any, setOptions: any) => {
  const options = accounts.map((account: any) => ({
    value: account,
    label: account,
  }));
  setOptions(options);
};

export const ContractId = ({ form }: any) => {
  const { control } = form;

  const accounts = useStoreState((state: any) => state.accounts.ids);
  const [options, setOptions] = useState([]);
  const contractId = useWatch({ control, name: 'params.account_id.value' });

  useEffect(() => {
    getOptions(accounts, setOptions);
  }, []);

  return (
    <FormSelectGroup
      name="params.account_id"
      accountId={contractId}
      label="Contract Id"
      control={control}
      options={options}
      isSearchable={true}
      isClearable={true}
      creatableSelect={true}
    />
  );
};
