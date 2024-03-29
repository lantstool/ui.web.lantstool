import { Controller } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../react-vault';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { selectStyles } from '../general/selectStyles.ts';
import { IndicatorsContainer } from '../../../../../general/FormSelect/IndicatorsContainer/IndicatorsContainer.tsx';
import cn from './SignerAccount.module.css';
import { BalanceLabel } from './BalanceLabel/BalanceLabel.tsx';

const getOptions: any = async (getAccountsIds: any, setOptions: any) => {
  const accounts = await getAccountsIds();
  const options = accounts.map((accountId: string) => ({
    value: accountId,
    label: accountId,
  }));
  setOptions(options);
};

export const SignerAccount = ({ form }: any) => {
  const { control, setValue } = form;
  const getAccountsIds = useStoreEffect((store: any) => store.accounts.getAccountsIds);
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
      <div className={cn.head}>
        <p>Account Id</p>
        <BalanceLabel form={form} />
      </div>
      <Controller
        name="signerId"
        control={control}
        render={({ field }: any) => (
          <Select
            {...field}
            onChange={onChange(field)}
            isSearchable
            components={{ IndicatorsContainer }}
            options={options}
            styles={selectStyles}
          />
        )}
      />
    </div>
  );
};
