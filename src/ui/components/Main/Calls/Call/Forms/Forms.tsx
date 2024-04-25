import { ContractsForms } from './ContractsForms/ContractsForms.tsx';
import { AccessKeysForms } from './AccessKeysForms/AccessKeysForms.tsx';
import { AccountsForms } from './AccountsForms/AccountsForms.tsx';
import { BlockForm } from './BlockForm/BlockForm.tsx';
import { ChunkForms } from './ChunkForms/ChunkForms.tsx';
import { GasForm } from './GasForm/GasForm.tsx';
import { ProtocolForms } from './ProtocolForms/ProtocolForms.tsx';
import { NetworkForms } from './NetworkForms/NetworkForms.tsx';
import { TransactionsForms } from './TransactionsForms/TransactionsForms.tsx';

export const Forms = ({ call }: any) => {
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
