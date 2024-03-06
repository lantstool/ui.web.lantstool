import { Button } from '../../../../general/Button/Button.tsx';
import { useFieldArray } from 'react-hook-form';
import addIcon from '../../../../../../assets/addIcon.svg';
import cn from './Method.module.css';
import { createMethod } from './createMethod.ts';
import { Item } from './Item/Item.tsx';

export const Method = ({ type, edit, text, form }) => {
  const { register, control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: type,
  });

  const addMethod = () => createMethod(append);
  const deleteMethod = (index: any) => remove(index);

  return (
    <div className={cn.container}>
      {(fields.length > 0 || edit) && <h2 className={cn.title}>{`${text} Methods`}</h2>}
      {fields.map((el: any, index: any) => (
        <Item
          key={el.methodId}
          edit={edit}
          type={type}
          index={index}
          deleteMethod={deleteMethod}
          register={register}
        />
      ))}
      {edit && (
        <div className={cn.btnWrapper}>
          <Button src={addIcon} text={`Add ${text} Method`} style="secondary" onClick={addMethod} />
        </div>
      )}
    </div>
  );
};
