import { ViewContractCode } from './ViewContractCode.jsx';
import { ViewContractState } from './ViewContractState.jsx';
import { ViewContractStateChanges } from './ViewContractStateChanges.jsx';
import { ViewContractCodeChanges } from './ViewContractCodeChanges.jsx';
import { CallContractFunction } from './CallContractFunction.jsx';

export const ContractsForms = ({ call }) => (
  <>
    {call.type === 'view_code' && <ViewContractCode call={call} />}
    {call.type === 'view_state' && <ViewContractState call={call} />}
    {call.type === 'data_changes' && <ViewContractStateChanges call={call} />}
    {call.type === 'contract_code_changes' && <ViewContractCodeChanges call={call} />}
    {call.type === 'call_function' && <CallContractFunction call={call} />}
  </>
);
