import { InputDropdownGroup } from '../../../../../../../../../_general/InputDropdownGroup/InputDropdownGroup.jsx';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import cn from './Transfer.module.scss'

const options = [
  { value: 'NEAR', label: 'NEAR' },
  { value: 'yoctoNEAR', label: 'yoctoNEAR' },
];

export const Transfer = ({ form, getName, removeAction, order }) => {
  const { register, control } = form;

  return (
    <ActionBase
      removeAction={removeAction}
      label="Transfer funds"
      order={order}
      color="cyan"
      tooltipContent="Transfer funds"
      iconStyle={cn.icon}
    >
        <InputDropdownGroup
          control={control}
          register={register}
          name={getName('amount')}
          options={options}
          label="Amount"
          dropDownName={getName('amountType')}
        />
    </ActionBase>
  );
};
