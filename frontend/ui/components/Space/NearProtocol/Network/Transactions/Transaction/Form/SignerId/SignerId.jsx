import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { FormDropdown } from '../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import cn from './SignerId.module.scss';

export const SignerId = ({ form }) => {
  const { control } = form;
  const options = useAccountsOptions();

  return (
    <div className={cn.signerAccount}>
      <FormDropdown
        name="signerId"
        isSearchable={true}
        isClearable={true}
        control={control}
        options={options}
        creatableSelect={true}
        label="Account Id"
      />
    </div>
  );
};
