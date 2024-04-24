import { GenesisConfig } from './GenesisConfig.tsx';

export const ProtocolForms = ({ call }: any) => (
  <>
      {call.type === 'EXPERIMENTAL_genesis_config' && <GenesisConfig call={call} />}
  </>
);
