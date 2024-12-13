import { useWatch } from 'react-hook-form';
import { RadioButton } from '../../../../../../../../../../../_general/RadioButton/RadioButton.jsx';
import { InputActionGroup } from '../../../../../../../../../../../_general/InputActionGroup/InputActionGroup.jsx';
import cn from './Allowance.module.scss';

const options = [
  { value: 'NEAR', label: 'NEAR' },
  { value: 'yoctoNEAR', label: 'yoctoNEAR' },
];

export const Allowance = ({ form, getName }) => {
  const allowedAllowanceName = getName('permission.restrictions.allowedAllowance');
  const allowanceName = getName('permission.restrictions.allowance');
  const allowanceType = getName('permission.restrictions.allowanceType');
  const { control, register } = form;

  const allowedAllowance = useWatch({
    control,
    name: allowedAllowanceName,
  });

  const isLimitedAllowance = allowedAllowance === 'Limited';

  return (
    <div className={isLimitedAllowance?cn.allowance : cn.allowanceBigMargin}>
      <h2 className={cn.title}>Allowance</h2>
      <div className={cn.container}>
        <RadioButton
          label="Unlimited"
          name={allowedAllowanceName}
          register={register}
          value="Unlimited"
        />
        <RadioButton
          label="Limited"
          name={allowedAllowanceName}
          register={register}
          value="Limited"
        />
      </div>
      {isLimitedAllowance && (
        <div className={cn.limitedAllowance}>
          <InputActionGroup
            control={form.control}
            name={allowanceName}
            options={options}
            label="Amount"
            dropDownName={allowanceType}
            // dynamicErrorSpace
          />
        </div>
      )}
    </div>
  );
};
