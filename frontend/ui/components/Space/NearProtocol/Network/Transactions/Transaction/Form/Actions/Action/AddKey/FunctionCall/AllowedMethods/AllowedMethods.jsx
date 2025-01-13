import { useFieldArray, useWatch } from 'react-hook-form';
import { FormRadioButton } from '../../../../../../../../../../../_general/FormRadioButton/FormRadioButton.jsx';
import { Button } from '../../../../../../../../../../../_general/Button/Button.jsx';
import { FormDropdownGroup } from '../../../../../../../../../../../_general/dropdown/FormDropdownGroup/FormDropdownGroup.jsx';
import { Tooltip } from '../../../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { useContractMethodsOptions } from '../../../../../../../../_general/hooks/useContractMethodsOptions.js';
import cn from './AllowedMethods.module.scss';

const toSet = (selectedMethods = []) =>
  new Set(selectedMethods.map((obj) => obj.methodName?.value));

// We want to help user to avoid seeing methods, which is already selected
const useGetOptions = (control, getName, methodNamesName) => {
  const allMethods = useContractMethodsOptions(control, getName('restrictions.contractId.value'));
  const selectedMethods = useWatch({ control, name: methodNamesName });
  const set = toSet(selectedMethods);
  return allMethods.filter(({ value }) => !set.has(value));
};

export const AllowedMethods = ({ form, getName }) => {
  const onlyCertainFormName = getName('restrictions.methods.onlyCertain');
  const listFormName = getName('restrictions.methods.list');

  const { control } = form;
  const options = useGetOptions(control, getName, listFormName);

  const onlyCertain = useWatch({ control, name: onlyCertainFormName });
  const { fields, append, remove } = useFieldArray({ control, name: listFormName });

  const addMethod = () => append({ methodName: null });
  const removeMethod = (index) => remove(index);

  return (
    <>
      <h2 className={cn.title}>Allowed methods</h2>
      <div className={cn.container}>
        <FormRadioButton label="All" name={onlyCertainFormName} control={control} value={false} />
        <FormRadioButton
          label="Certain"
          name={onlyCertainFormName}
          control={control}
          value={true}
        />
      </div>
      {onlyCertain && (
        <div className={cn.methods}>
          {fields.map((method, index) => (
            <FormDropdownGroup
              key={index}
              control={control}
              options={options}
              name={`${listFormName}.${index}.methodName`}
              label="Method Name"
              onClick={() => removeMethod(index)}
              actionDisabled={fields.length === 1}
              iconStyles={cn.icon}
              creatableSelect
              copy={false}
              isSearchable
              isClearable
              placeholder="Select or type..."
              tooltip={<Tooltip content="Method name" placement="top" defaultContent />}
            />
          ))}
          <Button iconLeftStyles={cn.iconAdd} color="secondary" size="medium" onClick={addMethod}>
            Add more
          </Button>
        </div>
      )}
    </>
  );
};
