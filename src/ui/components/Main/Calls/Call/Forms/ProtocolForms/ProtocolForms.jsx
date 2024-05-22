import { ProtocolConfig } from './ProtocolConfig.jsx';

export const ProtocolForms = ({ form, type }) => (
  <>
    {type === 'EXPERIMENTAL_genesis_config' && null}
    {type === 'EXPERIMENTAL_protocol_config' && <ProtocolConfig form={form} />}
  </>
);
