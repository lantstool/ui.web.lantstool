import { FormInputActionGroup } from '../../../../../../../../../_general/input/FormInputActionGroup/FormInputActionGroup.jsx';
import { transactionConfig } from '../../../../../_general/transactionConfig.js';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';

const nearUnitOptions = [transactionConfig.nearUnits.NEAR, transactionConfig.nearUnits.yoctoNEAR];

export const Transfer = ({ iconStyle, form, getName, removeAction, order }) => (
  <ActionBase
    removeAction={removeAction}
    label="Transfer"
    order={order}
    color="cyan"
    tooltipContent="Transfer funds"
    iconStyle={iconStyle}
  >
    <FormInputActionGroup
      control={form.control}
      name={getName('quantity.amount')}
      placeholder={0}
      options={nearUnitOptions}
      label="Amount"
      dropDownName={getName('quantity.unit')}
      dynamicErrorSpace
    />
  </ActionBase>
);
