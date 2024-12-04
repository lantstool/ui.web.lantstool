import { useFieldArray, useWatch } from 'react-hook-form';
import { Button } from '../../../../../../../../_general/Button/Button.jsx';
import { FormDropdown } from '../../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { TrashBinOutline } from '../../../../../../../../_general/icons/TrashBinOutline.jsx';
import { AddSquareOutline } from '../../../../../../../../_general/icons/AddSquareOutline.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { DropdownActionGroup } from '../../../../../../../../_general/DropdownActionGroup/DropdownActionGroup.jsx';
import { InputDropdownGroup } from '../../../../../../../../_general/InputDropdownGroup/InputDropdownGroup.jsx';
import cn from './AccountIds.module.scss';
import { Tooltip } from '../../../../../../../../_general/Tooltip/Tooltip.jsx';

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
    <>
      {list.map((field, index) => (
        <div className={cn.row} key={field.id}>
          <DropdownActionGroup
            name={`accountIds.${index}.accountId`}
            label="Account Id"
            control={control}
            options={options}
            error={true}
            isSearchable
            isClearable
            creatableSelect
            onClick={() => remove(index)}
            actionDisabled={list.length < 2}
            tooltip={<Tooltip content="Account id" placement="top" defaultContent />}
          >
            {/*TODO we must change icon hover */}
            <span className={cn.deleteIcon} />
            {/*Account ID*/}
          </DropdownActionGroup>
        </div>
      ))}
      {/* <InputDropdownGroup*/}
      {/*   name={`accountIds.1.accountId`}*/}
      {/*   label="Account Id"*/}
      {/*   control={control}*/}
      {/*   options={options}*/}
      {/*   // disabled={true}*/}
      {/*   // error={true}*/}
      {/*   dropDownName={'drop'}*/}
      {/*   isSearchable*/}
      {/*   isClearable*/}
      {/*   creatableSelect*/}
      {/*   onClick={() => remove(index)}*/}
      {/*   actionDisabled={list.length < 2}*/}
      {/*/>*/}
      <Button IconLeft={AddSquareOutline} size="medium" color="secondary" onClick={add}>
        Add Account
      </Button>
    </>
  );
};
