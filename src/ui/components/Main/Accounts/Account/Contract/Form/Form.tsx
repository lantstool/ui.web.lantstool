import cn from './Form.module.css';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { selectStyles } from '../../../../Transactions/Transaction/Form/general/selectStyles.ts';
import { useStoreEffect, useStoreState } from '../../../../../../../react-vault';
import { useEffect, useState } from 'react';

const getOptions: any = (contracts: any, setOptions: any) => {
  const options = Object.values(contracts).map((contract: any) => ({
    contractId: contract.contractId,
    value: contract.name,
    label: contract.name,
  }));
  setOptions(options);
};

const getDefaultFormValues = (contract: any) => ({
  contract: {
    value: contract?.name || '',
    label: contract?.name || '',
  },
});

export const Form = ({ accountId, contract }) => {
  const addContract = useStoreEffect((store: any) => store.accounts.addContract);
  const [options, setOptions]: any = useState([]);
  const records: any = useStoreState((store: any) => store.contracts.records);

  const defaultFormValues: any = getDefaultFormValues(contract);
  const form = useForm({ defaultValues: defaultFormValues });
  const { control } = form;

  useEffect(() => {
    getOptions(Object.values(records), setOptions);
  }, []);

  const onChange = (field: any) => (event: any) => {
    addContract({ contractId: event?.contractId, accountId });
    field.onChange(event);
  };

  return (
    <form className={cn.form}>
      <Controller
        name="contract"
        control={control}
        render={({ field }: any) => (
          <Select
            {...field}
            isSearchable
            isClearable={true}
            options={options}
            styles={selectStyles}
            onChange={onChange(field)}
          />
        )}
      />
    </form>
  );
};
