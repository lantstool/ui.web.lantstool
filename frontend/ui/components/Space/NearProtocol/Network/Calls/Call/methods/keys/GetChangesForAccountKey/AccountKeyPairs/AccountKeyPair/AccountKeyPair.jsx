import { Button } from '../../../../../../../../../../_general/Button/Button.jsx';
import { TrashBinOutline } from '../../../../../../../../../../_general/icons/TrashBinOutline.jsx';
import { useAccountsOptions } from '../../../../../../../_general/hooks/useAccountsOptions.js';
import { Dropdown } from '../../../../../../../../../../_general/Dropdown/Dropdown.jsx';
import { usePublicKeyOptions } from './usePublicKeyOptions.js';
import cn from './AccountKeyPair.module.scss';

export const AccountKeyPair = ({ form, control, index, remove, isDisabled }) => {
  const getName = (name) => `accountKeyPairs.${index}.${name}`;

  const accountOptions = useAccountsOptions();
  const keyOptions = usePublicKeyOptions(form, getName);

  const onAccountChange = (field) => (event) => {
    field.onChange(event);
    form.setValue(getName('publicKey'), null);
  };

  return (
    <div className={cn.row}>
      <div className={cn.dropdowns}>
        <Dropdown
          name={getName('accountId')}
          label="Account Id"
          control={control}
          options={accountOptions}
          onChange={onAccountChange}
          isSearchable
          isClearable
          creatableSelect
        />
        <Dropdown
          name={getName('publicKey')}
          label="Public key"
          control={control}
          options={keyOptions}
          isSearchable
        />
      </div>
      <Button
        IconLeft={TrashBinOutline}
        size="large"
        color="secondary"
        onClick={() => remove(index)}
        disabled={isDisabled}
      />
    </div>
  );
};
