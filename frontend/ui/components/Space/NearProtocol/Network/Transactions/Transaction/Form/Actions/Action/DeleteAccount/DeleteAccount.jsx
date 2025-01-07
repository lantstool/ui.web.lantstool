import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { FormDropdown } from '../../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { useAccountsOptions } from '../../../../../../_general/hooks/useAccountsOptions.js';

export const DeleteAccount = ({ form, getName, order, iconStyle, removeAction }) => {
  const { control } = form;
  const options = useAccountsOptions();

  return (
    <ActionBase
      iconStyle={iconStyle}
      color="error"
      removeAction={removeAction}
      label="Delete Account"
      order={order}
      tooltipContent="Delete Account"
    >
      <FormDropdown
        name={getName('beneficiaryId')}
        control={control}
        options={options}
        creatableSelect
        isSearchable
        isClearable
        label="Beneficiary Id"
        placeholder="Select or type..."
        tooltip={<Tooltip defaultContent placement="top" content="Beneficiar ID" />}
        dynamicErrorSpace
      />
    </ActionBase>
  );
};
