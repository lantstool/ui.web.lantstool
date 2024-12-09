import { useFieldArray } from 'react-hook-form';
import { Action } from './Action/Action.jsx';
import { AddAction } from './AddAction/AddAction.jsx';

export const Actions = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'actions',
  });

  return (
    <>
      {fields.map((action, index) => (
        <Action key={action.actionId} index={index} action={action} form={form} remove={remove} />
      ))}
      <AddAction append={append} fields={fields} />
    </>
  );
};
