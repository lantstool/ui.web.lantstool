import { useFieldArray } from 'react-hook-form';
import { Action } from './Action/Action.jsx';
import { AddAction } from './AddAction/AddAction.jsx';
import cn from './Actions.module.scss';

export const Actions = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'actions',
  });

  return (
    <div className={cn.actions}>
      <div className={cn.label}>
        <span className={cn.icon} />
        <h2 className={cn.title}>Actions</h2>
      </div>
      {fields.map((action, index) => (
        <Action key={action.id} index={index} action={action} form={form} remove={remove} />
      ))}
      <AddAction append={append} fields={fields} />
    </div>
  );
};
