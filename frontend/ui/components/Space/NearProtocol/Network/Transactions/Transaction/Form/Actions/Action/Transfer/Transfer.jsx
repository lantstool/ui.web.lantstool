import { InputActionGroup } from '../../../../../../../../../_general/input/InputActionGroup/InputActionGroup.jsx';
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
    <InputActionGroup
      control={form.control}
      name={getName('amount')}
      placeholder={0}
      options={options}
      label="Amount"
      dropDownName={getName('amountType')}
      dynamicErrorSpace
    />
  </ActionBase>
);
