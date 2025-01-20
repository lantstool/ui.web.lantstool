import { Button } from '../../../../../../../../../../_general/Button/Button.jsx';
import { useAccountsOptions } from '../../../../../../../_general/hooks/useAccountsOptions.js';
import { FormDropdown } from '../../../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { usePublicKeyOptions } from './usePublicKeyOptions.js';
import { Label } from '../../../../../../../../../../_general/Label/Label.jsx';
import cn from './AccountKeyPair.module.scss';

export const AccountKeyPair = ({ form, control, index, remove, isDisabled }) => {
  const getName = (name) => `accountKeyPairs.${index}.${name}`;

  const accountOptions = useAccountsOptions();
  const keyOptions = usePublicKeyOptions(form, getName);

  const onAccountChange = (field) => (event) => {
    field.onChange(event);
    form.setValue(getName('publicKey'), null);
  };
  const accountId = form.watch(getName('accountId'));

  return (
    <div className={cn.accountKeyPair}>
      <div className={cn.container}>
        <Label color="grey">Pair</Label>
        <Button
          iconLeftStyles={cn.icon}
          size="small"
          color="tertiary"
          onClick={() => remove(index)}
          disabled={isDisabled}
        />
      </div>
      <FormDropdown
        name={getName('accountId')}
        label="Account Id"
        control={control}
        options={accountOptions}
        onChange={onAccountChange}
        isSearchable
        isClearable
        creatableSelect
      />
      <FormDropdown
        name={getName('publicKey')}
        label="Public key"
        control={control}
        options={keyOptions}
        isSearchable
        isDisabled={!accountId}
      />
    </div>
  );
};
