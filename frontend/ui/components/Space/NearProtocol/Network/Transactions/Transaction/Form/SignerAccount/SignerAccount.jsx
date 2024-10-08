import { FormSelectGroup } from '../../../../../../../_general/FormSelectGroup/FormSelectGroup.jsx';
import { useWatch } from 'react-hook-form';
import { useDropdownOptions } from './useDropdownOptions.js';
import cn from './SignerAccount.module.scss';

export const SignerAccount = ({ form }) => {
  const { control } = form;
  const options = useDropdownOptions();
  const accountId = useWatch({ control, name: 'signer.accountId' });

  return (
    <div className={cn.signerAccount}>
      <FormSelectGroup
        name="signer.accountId"
        isSearchable={true}
        isClearable={true}
        control={control}
        options={options}
        creatableSelect={true}
        accountId={accountId}
        label="Account Id"
      />
    </div>
  );
};
