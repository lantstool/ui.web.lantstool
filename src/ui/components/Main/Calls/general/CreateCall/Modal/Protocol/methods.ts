export const methods = [
  {
    type: 'EXPERIMENTAL_genesis_config',
    text: 'Genesis Config',
    method: 'EXPERIMENTAL_genesis_config',
  },
  {
    type: 'EXPERIMENTAL_protocol_config',
    text: 'Protocol Config',
    method: 'EXPERIMENTAL_protocol_config',
    params: {
      type: 'finality',
      finality: 'final',
      block_id: '',
    },
  },
];
