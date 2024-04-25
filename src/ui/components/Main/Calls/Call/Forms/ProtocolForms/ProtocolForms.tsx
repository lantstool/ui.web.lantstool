import { GenesisConfig } from './GenesisConfig.tsx';
import { ProtocolConfig } from './ProtocolConfig.tsx';

export const ProtocolForms = ({ call }: any) => (
  <>
    {call.type === 'EXPERIMENTAL_genesis_config' && <GenesisConfig call={call} />}
    {call.type === 'EXPERIMENTAL_protocol_config' && <ProtocolConfig call={call} />}
  </>
);
