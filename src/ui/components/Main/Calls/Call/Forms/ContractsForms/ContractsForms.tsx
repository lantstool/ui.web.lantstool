import { ViewContractCode } from './ViewContractCode.tsx';
import { ViewContractState } from './ViewContractState.tsx';
import { ViewContractStateChanges } from './ViewContractStateChanges.tsx';
import { ViewContractCodeChanges } from './ViewContractCodeChanges.tsx';
import { CallContractFunction } from './CallContractFunction.tsx';

export const ContractsForms = ({ call }: any) => (
  <>
    {call.type === 'view_code' && <ViewContractCode call={call} />}
    {call.type === 'view_state' && <ViewContractState call={call} />}
    {call.type === 'data_changes' && <ViewContractStateChanges call={call} />}
    {call.type === 'contract_code_changes' && <ViewContractCodeChanges call={call} />}
    {call.type === 'call_function' && <CallContractFunction call={call} />}
  </>
);
