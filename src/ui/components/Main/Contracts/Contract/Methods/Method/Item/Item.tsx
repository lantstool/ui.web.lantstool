import cn from './Item.module.css';
import { Input } from '../../../../../../general/Input/Input.tsx';
import { DeleteIcon } from '../../../../../../../assets/components/DeleteIcon.tsx';

export const Item = ({ edit, type, index, deleteMethod, register, errors }: any) => {
  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <div>
          <Input register={register} name={`${type}.${index}.methodName`} disabled={!edit} />
        </div>
        <p className={cn.error}>{errors && errors?.methodName?.message}</p>
      </div>
      {edit && (
        <button className={cn.deleteBtn} type="button" onClick={() => deleteMethod(index)}>
          <DeleteIcon style={cn.icon} />
        </button>
      )}
    </div>
  );
};
