import cn from './Item.module.css';
import { Input } from '../../../../../../general/Input/Input.tsx';
import { DeleteIcon } from '../../../../../../../assets/components/DeleteIcon.tsx';

export const Item = ({ edit, type, index, deleteMethod, register }: any) => {
  const getName = (name: any) => `${type}.${index}.${name}`;


  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <Input register={register} name={getName('methodName')} disabled={!edit} />
      </div>

      {edit && (
        <button className={cn.deleteBtn} type="button" onClick={() => deleteMethod(index)}>
          <DeleteIcon style={cn.icon} />
        </button>
      )}
    </div>
  );
};
