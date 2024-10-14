import { useFieldArray } from 'react-hook-form';
import { Action } from './Action/Action.jsx';
import { AddAction } from './AddAction/AddAction.jsx';
import cn from './Actions.module.css';
import { useKeyType } from './useKeyType.js';

export const Actions = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'actions',
  });

  const keyType = useKeyType(append, form);
  const text = keyType !== 'FullAccess' ? 'Action' : 'Actions';
  const isDeleteAccount = fields.find((el) => el.type === 'DeleteAccount');

  return (
    <div>
      {keyType !== 'Empty' && <h3 className={cn.title}>{text}</h3>}
      {fields.map((action, index) => (
        <Action key={action.actionId} index={index} action={action} form={form} remove={remove} />
      ))}
      {keyType === 'FullAccess' && !isDeleteAccount && (
        <AddAction append={append} fields={fields} />
      )}
    </div>
  );
};
