import { useFieldArray, useWatch } from 'react-hook-form';
import { InputGroup } from '../../../../../../../../../general/InputGroup/InputGroup.tsx';
import cn from './AllowedMethods.module.css';

export const AllowedMethods = ({ form, getName }: any) => {
  const allowedMethodsName = getName('permission.restrictions.allowedMethods');
  const methodNamesName = getName('permission.restrictions.methodNames');
  const { control, register } = form;

  const allowedMethods = useWatch({
    control,
    name: allowedMethodsName,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: methodNamesName,
  });

  const addMethod = () => append({ name: '' });
  const removeMethod = (index: number) => remove(index);

  return (
    <fieldset className={cn.allowedMethods}>
      <legend>Allowed Methods</legend>
      <input
        {...register(allowedMethodsName)}
        type="radio"
        id={`${allowedMethodsName}.all`}
        value="All"
      />
      <label htmlFor={`${allowedMethodsName}.all`}>All</label>

      <input
        {...register(allowedMethodsName)}
        type="radio"
        id={`${allowedMethodsName}.certain`}
        value="Certain"
      />
      <label htmlFor={`${allowedMethodsName}.certain`}>Certain</label>

      {allowedMethods === 'Certain' && (
        <>
          {fields.map((method, index) => (
            <div key={method.id} className={cn.row}>
              <div className={cn.inputGroupWrapper}>
                <InputGroup
                  register={register}
                  name={`${methodNamesName}.${index}.name`}
                  label="Method Name"
                />
              </div>
              {fields.length > 1 && (
                <button onClick={() => removeMethod(index)} style={{ marginTop: 20 }}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addMethod}>
            Add Method
          </button>
        </>
      )}
    </fieldset>
  );
};
