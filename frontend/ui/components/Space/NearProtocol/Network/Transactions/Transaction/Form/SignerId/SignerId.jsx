import { useAccountsOptionsWithLoading } from '../../../../_general/hooks/useAccountsOptionsWithLoading.js';
import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { Label } from '@gc/Label/Label.jsx';
import { useAccountBalance } from './useAccountBalance.js';
import { useToggler } from '@hooks/useToggler.js';
import { ImportAccount } from '../../../../_general/ImportAccount/ImportAccount.jsx';
import { useWatch } from 'react-hook-form';
import { useRef } from 'react';
import { MenuList } from '../_general/MenuList/MenuList.jsx';
import { Tip } from './Tip/Tip.jsx';
import { useNetworkId } from '@hooks/useNetworkId.js';
import cn from './SignerId.module.scss';

export const SignerId = ({ form }) => {
  const { control, setValue } = form;
  const { isTestnet } = useNetworkId();
  const signerId = useWatch({ control, name: 'signerId.value' });
  const { options, isLoading } = useAccountsOptionsWithLoading(signerId);
  const balance = useAccountBalance(signerId);
  const [isModalOpen, openModal, closeModal] = useToggler();
  const isShowTip = isTestnet && !isLoading && options.length === 0;
  const ref = useRef(null);

  const onChange = (field) => (event) => {
    field.onChange(event);
    setValue('signerKey', null);
  };

  const setAccount = (value) => {
    setValue('signerId', { value: value, label: value });
    setValue('signerKey', null);
  };

  const onClick = () => {
    openModal();
    ref.current.blur();
  };

  return (
    <div className={cn.signerAccount}>
      <FormDropdown
        name="signerId"
        isSearchable={true}
        onChange={onChange}
        dropdownRef={ref}
        isClearable={true}
        control={control}
        options={options}
        creatableSelect={true}
        label="Signer Id"
        placeholder="Select or type..."
        components={{
          MenuList: (props) => (
            <MenuList props={props} onClick={onClick} icon={cn.importIcon} title="Import account" />
          ),
        }}
        tooltip={
          balance && (
            <Label iconStyles={cn.icon} color="grey">
              {balance}
            </Label>
          )
        }
      />
      {isShowTip && <Tip />}
      {isModalOpen && <ImportAccount closeModal={closeModal} setAccount={setAccount} />}
    </div>
  );
};
