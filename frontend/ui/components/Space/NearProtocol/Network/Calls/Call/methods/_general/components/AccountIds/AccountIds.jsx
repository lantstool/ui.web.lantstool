import { useFieldArray, useWatch } from 'react-hook-form';
import { Button } from '../../../../../../../../../_general/Button/Button.jsx';
import { AddSquareOutline } from '../../../../../../../../../_general/icons/AddSquareOutline.jsx';
import { useAccountsOptions } from '../../../../../../_general/hooks/useAccountsOptions.js';
import { FormDropdownGroup } from '../../../../../../../../../_general/FormDropdownGroup/FormDropdownGroup.jsx';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import cn from './AccountIds.module.scss';

const getPlaceholderData = (accountIds) =>
  accountIds.map((_, index) => ({ accountId: null, id: index }));

const toSet = (selectedAccounts = []) =>
  new Set(selectedAccounts.map((obj) => obj.accountId?.value));

// We want to help user to avoid seeing accounts, which is already selected
const useGetOptions = (control) => {
  const allAccounts = useAccountsOptions();
  const selectedAccounts = useWatch({ control, name: 'accountIds' });
  const set = toSet(selectedAccounts);
  return allAccounts.filter(({ value }) => !set.has(value));
};

export const AccountIds = ({ form, accountIds }) => {
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'accountIds',
  });
  const options = useGetOptions(control);
  // We use it to avoid screen blinking cuz during init render
  // 'fields' is always an empty array
  const list = fields.length === 0 ? getPlaceholderData(accountIds) : fields;
  const add = () => append({ accountId: null });

  return (
    <div className={cn.accountIds}>
      {list.map((field, index) => (
        <FormDropdownGroup
          key={field.id}
          name={`accountIds.${index}.accountId`}
          label="Account Id"
          control={control}
          options={options}
          isSearchable
          isClearable
          creatableSelect
          onClick={() => remove(index)}
          actionDisabled={list.length < 2}
          tooltip={<Tooltip content="Account id" placement="top" defaultContent />}
          iconStyles={cn.deleteIcon}
        />
      ))}
      <Button IconLeft={AddSquareOutline} size="medium" color="secondary" onClick={add}>
        Add Account
      </Button>
    </div>
  );
};
