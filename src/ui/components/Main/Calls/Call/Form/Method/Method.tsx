import { Controller, useWatch } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../react-vault';
import CreatableSelect from 'react-select/creatable';
import { useEffect, useState } from 'react';
import { selectStyles } from '../general/selectStyles.ts';
import { IndicatorsContainer } from '../general/IndicatorsContainer/IndicatorsContainer.tsx';
import cn from './Method.module.css';
import { Option } from '../general/Option/Option.tsx';
import { SelectHeadLabel } from '../general/SelectHeadLabel/SelectHeadLabel.tsx';

const getOptions: any = async (contractId: any, getContractMethods: any, setOptions: any) => {
  if (!contractId) return;

  const methods = await getContractMethods(contractId);
  const options = methods?.map((method: any) => ({
    value: method?.methodName,
    label: method?.methodName,
    type: method?.type,
  }));
  setOptions(options);
};

export const Method = ({ form }: any) => {
  const { control } = form;
  const getContractMethods = useStoreEffect((store: any) => store.accounts.getContractMethods);
  const [options, setOptions] = useState([]);

  const contractId = useWatch({ control, name: 'contractId.value' });
  const method = useWatch({ control, name: 'method' });

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
        <SelectHeadLabel permission={method.type} text="Method Name" />
      </div>
      <Controller
        name="method"
        control={control}
        render={({ field }: any) => (
          <CreatableSelect
            {...field}
            onChange={onChange(field)}
            isSearchable
            components={{ Option, IndicatorsContainer }}
            options={options}
            styles={selectStyles}
          />
        )}
      />
    </div>
  );
};
