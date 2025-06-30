import { useFieldArray, useWatch } from 'react-hook-form';
import { Tooltip } from '@gc/Tooltip/Tooltip.jsx';
import { Action } from './Action/Action.jsx';
import { AddAction } from './AddAction/AddAction.jsx';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';
import cn from './Actions.module.scss';

const BLOCKERS = new Set([
  'CreateAccount',
  'DeleteAccount',
  'DeleteKey',
  'DeployContract',
  'AddKey',
]);


// Return contractId without blockers before first FunctionCall
// or null for a quick return of getContractFunctions
const getContractIdBeforeBlockers = (actions) => {
  const firstFnIdx = actions.findIndex((a) => a.type === 'FunctionCall');
  if (firstFnIdx === -1) return null;

  const isContractIdBeforeBlockers = !actions.slice(0, firstFnIdx).some((a) => BLOCKERS.has(a.type));
  const contractId = actions.find((action) => action?.type === 'FunctionCall')?.contractId?.value;

  return isContractIdBeforeBlockers ? contractId : null;
};

export const Actions = ({ form }) => {
  const { control } = form;
  const { spaceId, networkId } = useParams();
  const getContractFunctions = useStoreEffect(
    (store) => store.nearProtocol.contractsMethods.getContractFunctions,
  );
  const actions = useWatch({ control, name: 'actions' });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'actions',
  });

  const contractId = getContractIdBeforeBlockers(actions);

  const loadContractFunctions = useLoader(
    getContractFunctions,
    { spaceId, networkId, contractId },
    [spaceId, networkId, contractId],
  );


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
        <Action
          key={action.id}
          index={index}
          action={action}
          form={form}
          remove={remove}
          loadContractFunctions={loadContractFunctions}
        />
      ))}
      <AddAction append={append} fields={fields} />
    </div>
  );
};
