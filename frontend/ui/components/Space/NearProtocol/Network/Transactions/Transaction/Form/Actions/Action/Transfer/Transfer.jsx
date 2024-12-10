import { InputDropdownGroup } from '../../../../../../../../../_general/InputDropdownGroup/InputDropdownGroup.jsx';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import cn from './Transfer.module.scss';

const options = [
  { value: 'NEAR', label: 'NEAR' },
  { value: 'yoctoNEAR', label: 'yoctoNEAR' },
];

export const Transfer = ({ form,name, getName, removeAction, order }) => (
  <ActionBase
    removeAction={removeAction}
    label={name}
    order={order}
    color="cyan"
    tooltipContent="Transfer funds"
    iconStyle={cn.icon}
  >
    <InputDropdownGroup
      control={form.control}
      name={getName('amount')}
      options={options}
      label="Amount"
      dropDownName={getName('amountType')}
    />
  </ActionBase>
);
