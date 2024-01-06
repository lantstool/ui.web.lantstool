import { Controller } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../../react-vault';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { selectStyles } from '../general/selectStyles.ts';

const getOptions = async (getAccountsIds: any, setOptions: any) => {
  const accounts = await getAccountsIds();
  const options = accounts.map((accountId: string) => ({
    value: accountId,
    label: accountId,
  }));
  setOptions(options);
};

export const SignerAccount = ({ form }: any) => {
  const { control, setValue } = form;
  const getAccountsIds = useStoreEffect((store: any) => store.vault.getAccountsIds);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getOptions(getAccountsIds, setOptions);
  }, []);

  const onChange = (field: any) => (event: any) => {
    field.onChange(event);
    setValue('signerKey', '');
  };

  return (
    <div>
      <p>Signer Account</p>
      <Controller
        name="signerId"
        control={control}
        render={({ field }: any) => (
          <Select
            {...field}
            onChange={onChange(field)}
            isSearchable
            options={options}
            styles={selectStyles}
          />
        )}
      />
    </div>
  );
};
