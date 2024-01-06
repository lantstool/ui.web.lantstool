import Select from 'react-select';
import { Controller, useWatch } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../../react-vault';
import { useEffect, useState } from 'react';
import { selectStyles } from '../general/selectStyles.ts';

const getOptions = async (accountId: string, getAccount: any, setOptions: any) => {
  if (!accountId) return;
  const account = await getAccount({ accountId });
  console.log(account);
  const options = account.list.map((publicKey: string) => ({
    value: publicKey,
    label: publicKey,
    permission: account.map[publicKey].permission,
  }));

  setOptions(options);
};

export const SignerKey = ({ form }: any) => {
  const { control } = form;
  const getAccount = useStoreEffect((store: any) => store.vault.getAccount);
  const accountId = useWatch({ control, name: 'signerId.value' });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getOptions(accountId, getAccount, setOptions);
  }, [accountId]);

  return (
    <div>
      <p>Signer Key</p>
      <Controller
        name="signerKey"
        control={control}
        render={({ field }: any) => (
          <Select {...field} isSearchable options={options} styles={selectStyles} />
        )}
      />
    </div>
  );
};
