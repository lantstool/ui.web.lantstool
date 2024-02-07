import { useFieldArray } from 'react-hook-form';
import { AddAction } from './AddAction/AddAction.tsx';
import cn from './Actions.module.css';

export const Actions = ({ form }: any) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'actions',
  });

  return (
    <div>
      <h3 className={cn.title}>Actions</h3>
      <AddAction append={append} />
    </div>
  );
};
