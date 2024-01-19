import { Controller, useWatch } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../../react-vault';
import Select, { components, OptionProps } from 'react-select';
import { useEffect, useState } from 'react';
import { selectStyles } from '../general/selectStyles.ts';
import { IndicatorsContainer } from './IndicatorsContainer/IndicatorsContainer.tsx';

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
  const [isOpen, setOpen] = useState(false);
  const getAccountsIds = useStoreEffect((store: any) => store.vault.getAccountsIds);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getOptions(getAccountsIds, setOptions);
  }, []);

  const onChange = (field: any) => (event: any) => {
    console.log(event);
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
            // components={}
              isClearable={true}
            options={options}
            styles={selectStyles}
          />
        )}
      />
    </div>
  );
};
