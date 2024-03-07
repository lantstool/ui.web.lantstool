import { Button } from '../../../../general/Button/Button.tsx';
import { useFieldArray } from 'react-hook-form';
import addIcon from '../../../../../../assets/addIcon.svg';
import cn from './Method.module.css';
import { Item } from './Item/Item.tsx';

export const Method = ({ type, edit, text, form }) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: type,
  });

  const isShowTitle = fields.length > 0 || edit;

  const addMethod = () => (errors?.[type] ? null : append({ methodName: '' }));

  const deleteMethod = (index: any) => remove(index);

  return (
    <div className={cn.container}>
      {isShowTitle && <h2 className={cn.title}>{`${text} Methods`}</h2>}
      {fields.map((field: any, index: any) => (
        <Item
          key={field.id}
          edit={edit}
          type={type}
          index={index}
          errors={errors?.[type]?.[index]}
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
