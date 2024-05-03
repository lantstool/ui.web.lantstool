import { useFieldArray } from 'react-hook-form';
import { Action } from './Action/Action.jsx';
import { AddAction } from './AddAction/AddAction.jsx';
import cn from './Actions.module.css';

export const Actions = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'actions',
  });

  return (
    <div>
      <h3 className={cn.title}>Actions</h3>
      {fields.map((action, index) => (
        <Action key={action.actionId} index={index} action={action} form={form} remove={remove} />
      ))}
      <AddAction append={append} />
    </div>
  );
};
