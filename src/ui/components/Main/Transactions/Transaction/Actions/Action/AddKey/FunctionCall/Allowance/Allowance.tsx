import { useWatch } from 'react-hook-form';
import { InputGroup } from '../../../../../../../../general/InputGroup/InputGroup.tsx';
import cn from './Allowance.module.css';

export const Allowance = ({ form, getName }: any) => {
  const allowedAllowanceName = getName('permission.restrictions.allowedAllowance');
  const allowanceName = getName('permission.restrictions.allowance');

  const allowedAllowance = useWatch({
    control: form.control,
    name: allowedAllowanceName,
  });

  const isLimitedAllowance = allowedAllowance === 'Limited';

  return (
    <fieldset className={cn.allowance}>
      <legend>Allowance</legend>

      <input
        {...form.register(allowedAllowanceName)}
        type="radio"
        id={`${allowedAllowanceName}.unlimited`}
        value="Unlimited"
      />
      <label htmlFor={`${allowedAllowanceName}.unlimited`}>Unlimited</label>

      <input
        {...form.register(allowedAllowanceName)}
        type="radio"
        id={`${allowedAllowanceName}.limited`}
        value="Limited"
      />
      <label htmlFor={`${allowedAllowanceName}.limited`}>Limited</label>

      {isLimitedAllowance && (
        <InputGroup register={form.register} name={allowanceName} label="Amount" />
      )}
    </fieldset>
  );
};
