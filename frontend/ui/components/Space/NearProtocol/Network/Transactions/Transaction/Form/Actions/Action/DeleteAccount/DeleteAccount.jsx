import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { FormDropdown } from '../../../../../../../../../_general/dropdown/FormDropdown.jsx';
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
      tooltipContent={
        <>
          Removes an account and all its data from the blockchain.
          <br />• The remaining balance is transferred to a specified beneficiary account.
          <br />• If the beneficiary account does not exist, the funds will be distributed among
          validators.
          <br />• Note that even after deletion, all historical data associated with the account
          (such as the contract state) remains available for viewing—every blockchain record is
          stored permanently.
          <br />• This action can only be executed on the Signer’s account or on a newly created
          subaccount.
        </>
      }
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
        dynamicErrorSpace
      />
    </ActionBase>
  );
};
