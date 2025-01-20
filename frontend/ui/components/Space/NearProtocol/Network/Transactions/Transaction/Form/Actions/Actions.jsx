import { useFieldArray } from 'react-hook-form';
import { Tooltip } from '../../../../../../../_general/Tooltip/Tooltip.jsx';
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
        <Tooltip
          content={
            <div className={cn.tooltipContent}>
              A list of actions to be executed on behalf of the Signer.
              <br />
              • Actions are executed sequentially from the first to the last.
              <br />
              • Order is important. For example, Create Account must always be the first action,
              while Delete Account should be the last.
              <br />
              • If any action fails, none of the subsequent actions will be executed.
              <br />
              • Most actions - for example, Add Key or Deploy Contract - can only be executed on the
              Signer’s account or on a newly created subaccount (if the Create Account action is
              listed first).
              <br />• Up to 100 actions can be included.
            </div>
          }
          placement="top"
          defaultContent
        />
      </div>
      {fields.map((action, index) => (
        <Action key={action.id} index={index} action={action} form={form} remove={remove} />
      ))}
      <AddAction append={append} fields={fields} />
    </div>
  );
};
