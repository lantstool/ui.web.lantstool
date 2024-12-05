import { useFieldArray, useWatch } from 'react-hook-form';
import { Button } from '../../../../../../../../_general/Button/Button.jsx';
import { AddSquareOutline } from '../../../../../../../../_general/icons/AddSquareOutline.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { Tooltip } from '../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { FormDropdownGroup } from '../../../../../../../../_general/FormDropdownGroup/FormDropdownGroup.jsx';
import cn from './ContractIds.module.scss';

const getPlaceholderData = (contractIds) =>
  contractIds.map((_, index) => ({ contractId: null, id: index }));

const toSet = (selectedContracts = []) =>
  new Set(selectedContracts.map((obj) => obj.contractId?.value));

// We want to help user to avoid seeing contracts, which is already selected
const useGetOptions = (control) => {
  const allAccounts = useAccountsOptions();
  const selectedContracts = useWatch({ control, name: 'contractIds' });
  const set = toSet(selectedContracts);
  return allAccounts.filter(({ value }) => !set.has(value));
};

export const ContractIds = ({ form, contractIds }) => {
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contractIds',
  });
  const options = useGetOptions(control);
  // We use it to avoid screen blinking cuz during init render
  // 'fields' is always an empty array
  const list = fields.length === 0 ? getPlaceholderData(contractIds) : fields;
  const add = () => append({ contractId: null });

  return (
    <div className={cn.contractIds}>
      {list.map((field, index) => (
        <FormDropdownGroup
          key={field.id}
          name={`contractIds.${index}.contractId`}
          label="Contract Id"
          control={control}
          options={options}
          isSearchable
          isClearable
          creatableSelect
          tooltip={<Tooltip content="Contract id" placement="top" defaultContent />}
          onClick={() => remove(index)}
          actionDisabled={list.length < 2}
          iconStyles={cn.deleteIcon}
        />
      ))}
      <Button IconLeft={AddSquareOutline} size="medium" color="secondary" onClick={add}>
        Add Contract
      </Button>
    </div>
  );
};
