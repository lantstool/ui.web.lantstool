import { ContractsForms } from './ContractsForms/ContractsForms.jsx';
import { AccessKeysForms } from './AccessKeysForms/AccessKeysForms.jsx';
import { AccountsForms } from './AccountsForms/AccountsForms.jsx';
import { BlockForm } from './BlockForm/BlockForm.jsx';
import { ChunkForms } from './ChunkForms/ChunkForms.jsx';
import { GasForm } from './GasForm/GasForm.jsx';
import { ProtocolForms } from './ProtocolForms/ProtocolForms.jsx';
import { NetworkForms } from './NetworkForms/NetworkForms.jsx';
import { TransactionsForms } from './TransactionsForms/TransactionsForms.jsx';

export const Forms = ({ call }) => {
  return (
    <>
      <ContractsForms call={call} />
      <AccessKeysForms call={call} />
      <AccountsForms call={call} />
      {call.type === 'block' && <BlockForm call={call} />}
      <ChunkForms call={call} />
      {call.type === 'gas_price' && <GasForm call={call} />}
      <ProtocolForms call={call} />
      <NetworkForms call={call} />
      <TransactionsForms call={call} />
    </>
  );
};
