import { ViewContractCode } from './ViewContractCode.jsx';
import { ViewContractState } from './ViewContractState.jsx';
import { ViewContractStateChanges } from './ViewContractStateChanges.jsx';
import { ViewContractCodeChanges } from './ViewContractCodeChanges.jsx';
import { CallFunction } from './CallFunction/CallFunction.jsx';

export const Contracts = ({ type, form }) => (
  <>
    {type === 'view_code' && <ViewContractCode form={form} />}
    {type === 'view_state' && <ViewContractState form={form} />}
    {type === 'data_changes' && <ViewContractStateChanges form={form} />}
    {type === 'contract_code_changes' && <ViewContractCodeChanges form={form} />}
    {type === 'call_function' && <CallFunction form={form} />}
  </>
);
