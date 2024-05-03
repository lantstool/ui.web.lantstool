import { useStoreEffect } from '../../../../../../../react-vault';
import { useEffect, useState } from 'react';
import cn from './SignerAccount.module.css';
import { FormSelectGroup } from '../../../../../general/FormSelectGroup/FormSelectGroup.jsx';
import { useWatch } from 'react-hook-form';

const getOptions = async (getAccountsIds, setOptions) => {
  const accounts = await getAccountsIds();
  const options = accounts.map((accountId) => ({
    value: accountId,
    label: accountId,
  }));
  setOptions(options);
};

export const SignerAccount = ({ form }) => {
  const { control, setValue } = form;
  const getAccountsIds = useStoreEffect((store) => store.accounts.getAccountsIds);
  const [options, setOptions] = useState([]);
  const accountId = useWatch({ control, name: 'signerId.value' });

  useEffect(() => {
    getOptions(getAccountsIds, setOptions);
  }, []);

  const onChange = (field) => (event) => {
    field.onChange(event);
    setValue('signerKey', '');
  };

  return (
    <div className={cn.signerAccount}>
      <FormSelectGroup
        name="signerId"
        isSearchable={true}
        isClearable={true}
        onChange={onChange}
        control={control}
        options={options}
        creatableSelect={true}
        accountId={accountId}
        label="Account Id"
      />
    </div>
  );
};
