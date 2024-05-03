import { GenesisConfig } from './GenesisConfig.jsx';
import { ProtocolConfig } from './ProtocolConfig.jsx';

export const ProtocolForms = ({ call }) => (
  <>
    {call.type === 'EXPERIMENTAL_genesis_config' && <GenesisConfig call={call} />}
    {call.type === 'EXPERIMENTAL_protocol_config' && <ProtocolConfig call={call} />}
  </>
);
