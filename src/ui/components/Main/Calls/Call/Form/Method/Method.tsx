import { Controller, useWatch } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../react-vault';
import CreatableSelect from 'react-select/creatable';
import { useEffect, useState } from 'react';
import { selectStyles } from '../general/selectStyles.ts';
import { IndicatorsContainer } from '../general/IndicatorsContainer/IndicatorsContainer.tsx';
import cn from './Method.module.css';

const getOptions: any = async (contractId: any, getContractMethods: any, setOptions: any) => {
  if (!contractId) return;

  const methods = await getContractMethods(contractId);
  const options = methods.map(({ name, type }) => ({
    value: name,
    label: name,
    type,
  }));
  console.log('options', options);
  setOptions(options);
};

export const Method = ({ form }: any) => {
  const { control } = form;
  const getContractMethods = useStoreEffect((store: any) => store.accounts.getContractMethods);
  const [options, setOptions] = useState([]);

  const contractId = useWatch({ control, name: 'contractId.value' });

  useEffect(() => {
    getOptions(contractId, getContractMethods, setOptions);
  }, [contractId]);

  const onChange = (field: any) => (event: any) => {
    field.onChange(event);
    // setValue('signerKey', '');
  };

  return (
    <div>
      <div className={cn.head}>
        <p>Method Name</p>
      </div>
      <Controller
        name="method"
        control={control}
        render={({ field }: any) => (
          <CreatableSelect
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
