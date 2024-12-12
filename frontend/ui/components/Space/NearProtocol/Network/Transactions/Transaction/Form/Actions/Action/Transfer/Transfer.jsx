import { InputDropdownGroup } from '../../../../../../../../../_general/InputDropdownGroup/InputDropdownGroup.jsx';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';

const options = [
  { value: 'NEAR', label: 'NEAR' },
  { value: 'yoctoNEAR', label: 'yoctoNEAR' },
];

export const Transfer = ({ iconStyle, form, name, getName, removeAction, order }) => (
  <ActionBase
    removeAction={removeAction}
    label={name}
    order={order}
    color="cyan"
    tooltipContent="Transfer funds"
    iconStyle={iconStyle}
  >
    <InputDropdownGroup
      control={form.control}
      name={getName('amount')}
      options={options}
      label="Amount"
      dropDownName={getName('amountType')}
      dynamicErrorSpace
    />
  </ActionBase>
);
