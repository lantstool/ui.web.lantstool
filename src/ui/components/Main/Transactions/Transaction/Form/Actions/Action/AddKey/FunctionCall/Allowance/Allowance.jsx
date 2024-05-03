import { useWatch } from 'react-hook-form';
import { InputGroup } from '../../../../../../../../../general/InputGroup/InputGroup.jsx';
import cn from './Allowance.module.css';

export const Allowance = ({ form, getName }) => {
  const allowedAllowanceName = getName('permission.restrictions.allowedAllowance');
  const allowanceName = getName('permission.restrictions.allowance');
  const { control, register } = form;

  const allowedAllowance = useWatch({
    control,
    name: allowedAllowanceName,
  });

  const isLimitedAllowance = allowedAllowance === 'Limited';

  return (
    <fieldset className={cn.allowance}>
      <legend>Allowance</legend>

      <input
        {...register(allowedAllowanceName)}
        type="radio"
        id={`${allowedAllowanceName}.unlimited`}
        value="Unlimited"
      />
      <label htmlFor={`${allowedAllowanceName}.unlimited`}>Unlimited</label>

      <input
        {...register(allowedAllowanceName)}
        type="radio"
        id={`${allowedAllowanceName}.limited`}
        value="Limited"
      />
      <label htmlFor={`${allowedAllowanceName}.limited`}>Limited</label>

      {isLimitedAllowance && <InputGroup register={register} name={allowanceName} label="Amount" />}
    </fieldset>
  );
};
