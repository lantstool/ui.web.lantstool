import { Controller } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../react-vault';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { selectStyles } from '../general/selectStyles.ts';
import { IndicatorsContainer } from '../general/IndicatorsContainer/IndicatorsContainer.tsx';
import cn from './Contract.module.css';
import { BalanceLabel } from './BalanceLabel/BalanceLabel.tsx';

// TODO show only contract here
const getOptions: any = async (getAccountsIds: any, setOptions: any) => {
  const accounts = await getAccountsIds();
  const options = accounts.map((accountId: string) => ({
    value: accountId,
    label: accountId,
  }));
  setOptions(options);
};


export const Contract = ({ form }: any) => {
  const { control, setValue } = form;
  const getAccountsIds = useStoreEffect((store: any) => store.accounts.getAccountsIds);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getOptions(getAccountsIds, setOptions);
  }, []);

  const onChange = (field: any) => (event: any) => {
    field.onChange(event);
    setValue('method', '');
  };

  return (
    <div>
      <div className={cn.head}>
        <p>Contract Id</p>
        <BalanceLabel form={form} />
      </div>
      <Controller
        name="contractId"
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
