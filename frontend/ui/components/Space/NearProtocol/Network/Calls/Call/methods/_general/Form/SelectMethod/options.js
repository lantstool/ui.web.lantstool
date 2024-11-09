export const options = [
  {
    label: 'Account',
    options: [
      { value: 'getAccount', label: 'Get Account' },
      { value: 'getAccountChanges', label: 'Get Account Changes' },
    ],
  },
  {
    label: 'Contract',
    options: [
      { value: 'getContractWasm', label: 'Get Contract WASM' },
      { value: 'getContractWasmChanges', label: 'Get Contract WASM Changes' },
      { value: 'getContractState', label: 'Get Contract State' },
      { value: 'getContractStateChanges', label: 'Get Contract State Changes' },
      { value: 'callContractViewMethod', label: 'Call Contract View Method' },
    ],
  },
  {
    label: 'Account Keys',
    options: [
      { value: 'getAccountKey', label: 'Get Account Key' },
      { value: 'getChangesForAccountKey', label: 'Get Changes for Account Key' },
      { value: 'getAccountKeys', label: 'Get Account Keys' },
      { value: 'getChangesForAccountKeys', label: 'Get Changes for Account Keys' },
    ],
  },
  {
    label: 'Block',
    options: [
      // { value: 'getBlock', label: 'Get Block' },
      // { value: 'getBlockChanges', label: 'Get Block Changes' },
      // { value: 'getChunk', label: 'Get Chunk' },
    ],
  },
  // {
  //   label: 'Transaction',
  //   options: [
  //     {
  //       value: 'getTransaction',
  //       label: 'Get Transaction',
  //     },
  //     {
  //       value: 'getDetailedTransaction',
  //       label: 'Get Detailed Transaction',
  //     },
  //     {
  //       value: 'getReceipt',
  //       label: 'Get Receipt',
  //     },
  //   ],
  // },
  // {
  //   label: 'Protocol',
  //   options: [
  //     {
  //       value: 'getProtocolConfig',
  //       label: 'Get Protocol Config',
  //     },
  //     {
  //       value: 'getGenesisConfig',
  //       label: 'Get Genesis Config',
  //     },
  //   ],
  // },
  // {
  //   label: 'Network',
  //   options: [
  //     {
  //       value: 'getNetwork',
  //       label: 'Get Network',
  //     },
  //     {
  //       value: 'getGasPrice',
  //       label: 'Get Gas Price',
  //     },
  //     {
  //       value: 'getNodeStatus',
  //       label: 'Get Node Status',
  //     },
  //   ],
  // },
  // {
  //   label: 'Validators',
  //   options: [
  //     {
  //       value: 'getValidators',
  //       label: 'Get Validators',
  //     },
  //     {
  //       value: 'getMaintenanceWindows',
  //       label: 'Get Maintenance Windows',
  //     },
  //   ],
  // },
];
