import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { FormDropdown } from '../../../../../../../_general/dropdown/FormDropdown.jsx';
import { Label } from '../../../../../../../_general/Label/Label.jsx';
import { useAccountBalance } from './useAccountBalance.js';
import { useToggler } from '@hooks/useToggler.js';
import { ImportAccount } from '../../../../_general/ImportAccount/ImportAccount.jsx';
import { useWatch } from 'react-hook-form';
import cn from './SignerId.module.scss';

export const SignerId = ({ form }) => {
  const { control, setValue } = form;
  const signerId = useWatch({ control, name: 'signerId.value' });
  const accountsOptions = useAccountsOptions();
  // const balance = useAccountBalance(signerId);
  const [isModalOpen, openModal, closeModal] = useToggler();

  const options = [
    ...accountsOptions,
    { value: 'importAccount', label: 'Import account', icon: cn.importIcon },
  ];

  const onChange = (field) => (event) => {
    if (event?.value === 'importAccount') {
      field.onChange(field.value);
      openModal();
    } else {
      field.onChange(event);
      setValue('signerKey', null);
    }
  };

  const setAccount = (value) => {
    setValue('signerId', { value: value, label: value });
    setValue('signerKey', null);
  };

  return (
    <div className={cn.signerAccount}>
      <FormDropdown
        name="signerId"
        isSearchable={true}
        onChange={onChange}
        isClearable={true}
        control={control}
        options={options}
        creatableSelect={true}
        label="Account Id"
        // tooltip={
        //   balance && (
        //     <Label iconStyles={cn.icon} color="grey">
        //       {balance}
        //     </Label>
        //   )
        // }
      />
      {isModalOpen && <ImportAccount closeModal={closeModal} setAccount={setAccount} />}
    </div>
  );
};
