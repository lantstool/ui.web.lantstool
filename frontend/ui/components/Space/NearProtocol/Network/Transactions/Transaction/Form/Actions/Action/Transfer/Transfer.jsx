import { InputGroup } from '../../../../../../../../../_general/InputGroup/InputGroup.jsx';
import cn from './Transfer.module.css';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { transferSelectorStyles } from './transferSelectorStyles.js';

const options = [
  { value: 'NEAR', label: 'NEAR' },
  { value: 'yoctoNEAR', label: 'yoctoNEAR' },
];

export const Transfer = ({ form, getName }) => {
  const { register, control } = form;

  return (
    <div className={cn.transfer}>
      <div className={cn.amount}>
        <InputGroup register={register} name={getName('amount')} label="Amount" />
      </div>
      <div className={cn.wrapper}>
        <Controller
          name={getName('amountType')}
          control={control}
          render={({ field }) => (
            <Select {...field} isSearchable options={options} styles={transferSelectorStyles} />
          )}
        />
      </div>
    </div>
  );
};
