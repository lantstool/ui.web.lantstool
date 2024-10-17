import { useAccountsOptions } from '../_general/hooks/useAccountsOptions.js';
import { Dropdown } from '../../../../../../../_general/Dropdown/Dropdown.jsx';
import cn from './SignerId.module.scss';

export const SignerId = ({ form }) => {
  const { control } = form;
  const options = useAccountsOptions();

  return (
    <div className={cn.signerAccount}>
      <Dropdown
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
