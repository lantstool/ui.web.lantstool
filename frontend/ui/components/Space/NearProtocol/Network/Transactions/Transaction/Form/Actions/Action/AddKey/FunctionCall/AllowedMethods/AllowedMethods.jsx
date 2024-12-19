import { useFieldArray, useWatch } from 'react-hook-form';
import { RadioButton } from '../../../../../../../../../../../_general/RadioButton/RadioButton.jsx';
import { Button } from '../../../../../../../../../../../_general/Button/Button.jsx';
import { FormDropdownGroup } from '../../../../../../../../../../../_general/FormDropdownGroup/FormDropdownGroup.jsx';
import { Tooltip } from '../../../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { useContractMethodsOptions } from '../../../../../../../../_general/hooks/useContractMethodsOptions.js';
import cn from './AllowedMethods.module.scss';

const toSet = (selectedMethods = []) => new Set(selectedMethods.map((obj) => obj.name?.value));

// We want to help user to avoid seeing accounts, which is already selected
const useGetOptions = (control, getName, methodNamesName) => {
  const allMethods = useContractMethodsOptions(
    control,
    getName('permission.restrictions.receiverId.value'),
  );
  const selectedMethods = useWatch({ control, name: methodNamesName });
  const set = toSet(selectedMethods);
  return allMethods.filter(({ value }) => !set.has(value));
};

export const AllowedMethods = ({ form, getName }) => {
  const allowedMethodsName = getName('permission.restrictions.allowedMethods');
  const methodNamesName = getName('permission.restrictions.methodNames');
  const { control, register } = form;
  const options = useGetOptions(control, getName, methodNamesName);

  const allowedMethods = useWatch({
    control,
    name: allowedMethodsName,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: methodNamesName,
  });

  const addMethod = () => append({ name: null });
  const removeMethod = (index) => remove(index);

  return (
    <>
      <h2 className={cn.title}>Allowed methods</h2>
      <div className={cn.container}>
        <RadioButton label="All" name={allowedMethodsName} register={register} value="All" />
        <RadioButton
          label="Certain"
          name={allowedMethodsName}
          register={register}
          value="Certain"
        />
      </div>
      {allowedMethods === 'Certain' && (
        <div className={cn.methods}>
          {fields.map((method, index) => (
            <FormDropdownGroup
              key={index}
              control={control}
              options={options}
              name={`${methodNamesName}.${index}.name`}
              label="Method Name"
              onClick={() => removeMethod(index)}
              actionDisabled={fields.length === 1}
              iconStyles={cn.icon}
              creatableSelect
              copy={false}
              isSearchable
              isClearable
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
