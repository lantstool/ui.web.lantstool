import { FormSelectGroup } from '../../../../../../../_general/FormSelectGroup/FormSelectGroup.jsx';
import { useWatch } from 'react-hook-form';
import { useAccountsOptions } from '../_general/hooks/useAccountsOptions.js';
import cn from './SignerId.module.scss';

export const SignerId = ({ form }) => {
  const { control } = form;
  const options = useAccountsOptions();
  const accountId = useWatch({ control, name: 'signerId.value' });

  return (
    <div className={cn.signerAccount}>
      <FormSelectGroup
        name="signerId"
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
