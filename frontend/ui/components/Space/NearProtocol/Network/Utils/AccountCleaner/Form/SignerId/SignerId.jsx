import  { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { Label } from '@gc/Label/Label.jsx';
import { useAccountBalance } from './useAccountBalance.js';
import { useWatch } from 'react-hook-form';
import { useRef } from 'react';
import cn from './SignerId.module.scss';

// TODO Create a general Signer Id component
export const SignerId = ({ form }) => {
  const { control, setValue } = form;
  const signerId = useWatch({ control, name: 'signerId.value' });
  const accountsOptions = useAccountsOptions(signerId);
  const balance = useAccountBalance(signerId);
  const ref = useRef(null);

  const onChange = (field) => (event) => {
    field.onChange(event);
    setValue('signerKey', null);
  };

  return (
    <div className={cn.signerAccount}>
      <FormDropdown
        name="signerId"
        label="Signer Id"
        onChange={onChange}
        dropdownRef={ref}
        isSearchable
        isClearable
        creatableSelect
        control={control}
        options={accountsOptions}
        placeholder="Select or type..."
        tooltip={
          balance && (
            <Label iconStyles={cn.icon} color="grey">
              {balance}
            </Label>
          )
        }
      />
    </div>
  );
};
