import { FormRadioButton } from '../../../../../../../../../../../_general/FormRadioButton/FormRadioButton.jsx';
import { InputActionGroup } from '../../../../../../../../../../../_general/input/InputActionGroup/InputActionGroup.jsx';
import { transactionConfig } from '../../../../../../../_general/transactionConfig.js';
import cn from './Allowance.module.scss';

const nearUnitOptions = [transactionConfig.nearUnits.NEAR, transactionConfig.nearUnits.yoctoNEAR];

export const Allowance = ({ form, getName }) => {
  const isUnlimitedFormName = getName('restrictions.allowance.isUnlimited');
  const amountFormName = getName('restrictions.allowance.amount');
  const unitFormName = getName('restrictions.allowance.unit');

  const { control } = form;
  const isUnlimited = form.watch(isUnlimitedFormName);

  return (
    <div className={isUnlimited ? cn.allowanceBigMargin : cn.allowance}>
      <h2 className={cn.title}>Allowance</h2>
      <div className={cn.container}>
        <FormRadioButton
          label="Unlimited"
          name={isUnlimitedFormName}
          control={control}
          value={true}
        />
        <FormRadioButton
          label="Limited"
          name={isUnlimitedFormName}
          control={control}
          value={false}
        />
      </div>
      {!isUnlimited && (
        <div className={cn.limitedAllowance}>
          <InputActionGroup
            control={form.control}
            name={amountFormName}
            options={nearUnitOptions}
            label="Amount"
            dropDownName={unitFormName}
            placeholder="0.25"
          />
        </div>
      )}
    </div>
  );
};
