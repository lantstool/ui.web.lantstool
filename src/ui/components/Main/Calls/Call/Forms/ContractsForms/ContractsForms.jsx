import { ViewContractCode } from './ViewContractCode.jsx';
import { ViewContractState } from './ViewContractState.jsx';
import { ViewContractStateChanges } from './ViewContractStateChanges.jsx';
import { ViewContractCodeChanges } from './ViewContractCodeChanges.jsx';
import { CallContractFunction } from './CallContractFunction.jsx';

export const ContractsForms = ({ type, form }) => (
  <>
    {type === 'view_code' && <ViewContractCode form={form} />}
    {type === 'view_state' && <ViewContractState form={form} />}
    {type === 'data_changes' && <ViewContractStateChanges form={form} />}
    {type === 'contract_code_changes' && <ViewContractCodeChanges form={form} />}
    {type === 'call_function' && <CallContractFunction form={form} />}
  </>
);
