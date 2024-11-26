import { useFieldArray, useWatch } from 'react-hook-form';
import { Button } from '../../../../../../../../_general/Button/Button.jsx';
import { FormDropdown } from '../../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { TrashBinOutline } from '../../../../../../../../_general/icons/TrashBinOutline.jsx';
import { AddSquareOutline } from '../../../../../../../../_general/icons/AddSquareOutline.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
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
    <>
      <p>Select contracts your want to check</p>
      {list.map((field, index) => (
        <div className={cn.row} key={field.id}>
          <FormDropdown
            name={`contractIds.${index}.contractId`}
            label="Contract Id"
            control={control}
            options={options}
            isSearchable
            isClearable
            creatableSelect
          />
          <Button
            IconLeft={TrashBinOutline}
            size="large"
            color="secondary"
            onClick={() => remove(index)}
            disabled={list.length < 2}
          />
        </div>
      ))}
      <Button IconLeft={AddSquareOutline} size="medium" color="secondary" onClick={add}>
        Add Contract
      </Button>
    </>
  );
};
