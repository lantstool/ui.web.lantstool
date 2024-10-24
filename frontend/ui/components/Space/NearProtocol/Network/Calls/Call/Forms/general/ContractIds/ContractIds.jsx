import { useStoreState } from '../../../../../../../../../../../react-vault/index.js';
import { useEffect, useState } from 'react';
import { FormSelectGroup } from '../../../../../../../../_general/FormSelectGroup/FormSelectGroup.jsx';
import { useWatch } from 'react-hook-form';

const getOptions = async (accounts, setOptions) => {
  const options = accounts.map((account) => ({
    value: account,
    label: account,
  }));
  setOptions(options);
};

export const ContractIds = ({ form }) => {
  const { control } = form;

  const accounts = useStoreState((state) => state.accounts.ids);
  const [options, setOptions] = useState([]);
  const contractId = useWatch({ control, name: 'params.account_ids.value' });

  useEffect(() => {
    getOptions(accounts, setOptions);
  }, []);

  return (
    <FormSelectGroup
      name="params.account_ids"
      accountId={contractId}
      label="Contract Ids"
      control={control}
      options={options}
      isSearchable={true}
      isClearable={true}
      creatableSelect={true}
    />
  );
};
