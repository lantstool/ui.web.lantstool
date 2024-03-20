import { InputGroup } from '../../../../../../../general/InputGroup/InputGroup.tsx';
import cn from './Transfer.module.css';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { transferSelectorStyles } from './transferSelectorStyles.ts';
import { useEffect, useState } from 'react';

const getOptions: any = async (options: any, setOptions: any) => {
  const option = options.map((type: string) => ({
    value: type,
    label: type,
  }));
  setOptions(option);
};

export const Transfer = ({ form, getName }: any) => {
  const { register, control } = form;
  const [options, setOptions] = useState(['NEAR', 'yoctoNEAR']);

  const onChange = (field: any) => (event: any) => {
    field.onChange(event);
  };

  useEffect(() => {
    getOptions(options, setOptions);
  }, []);

  return (
    <div className={cn.transfer}>
      <div className={cn.amount}>
        <InputGroup register={register} name={getName('amount')} label="Amount" />
      </div>
      <div className={cn.wrapper}>
        <Controller
          name={getName('amountType')}
          control={control}
          render={({ field }: any) => (
            <Select
              {...field}
              onChange={onChange(field)}
              isSearchable
              options={options}
              styles={transferSelectorStyles}
            />
          )}
        />
      </div>
    </div>
  );
};
