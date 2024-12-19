const finality = {
  final: { value: 'final', label: 'Final' },
  'near-final': { value: 'near-final', label: 'Near Final' },
  optimistic: { value: 'optimistic', label: 'Optimistic' },
};

const waitUntil = {
  NONE: { value: 'NONE', label: 'None' },
  INCLUDED: { value: 'INCLUDED', label: 'Included' },
  EXECUTED_OPTIMISTIC: { value: 'EXECUTED_OPTIMISTIC', label: 'Executed Optimistic' },
  INCLUDED_FINAL: { value: 'INCLUDED_FINAL', label: 'Included Final' },
  EXECUTED: { value: 'EXECUTED', label: 'Executed' },
  FINAL: { value: 'FINAL', label: 'Final' },
};

const methodNames = {
  getAccount: { value: 'getAccount', label: 'Get Account' },
  getAccountChanges: { value: 'getAccountChanges', label: 'Get Account Changes' },

  getContractWasm: { value: 'getContractWasm', label: 'Get Contract WASM' },
  getContractWasmChanges: { value: 'getContractWasmChanges', label: 'Get Contract WASM Changes' },
  getContractState: { value: 'getContractState', label: 'Get Contract State' },
  getContractStateChanges: {
    value: 'getContractStateChanges',
    label: 'Get Contract State Changes',
  },
  callContractViewMethod: { value: 'callContractViewMethod', label: 'Call Contract View Method' },

  getAccountKey: { value: 'getAccountKey', label: 'Get Account Key' },
  getChangesForAccountKey: {
    value: 'getChangesForAccountKey',
    label: 'Get Changes for Account Key',
  },
  getAccountKeys: { value: 'getAccountKeys', label: 'Get Account Keys' },
  getChangesForAccountKeys: {
    value: 'getChangesForAccountKeys',
    label: 'Get Changes for Account Keys',
  },

  getBlock: { value: 'getBlock', label: 'Get Block' },
  getBlockChanges: { value: 'getBlockChanges', label: 'Get Block Changes' },
  getChunk: { value: 'getChunk', label: 'Get Chunk' },

  getTransaction: { value: 'getTransaction', label: 'Get Transaction' },
  getDetailedTransaction: { value: 'getDetailedTransaction', label: 'Get Detailed Transaction' },
  getReceipt: { value: 'getReceipt', label: 'Get Receipt' },

  getGenesisConfig: { value: 'getGenesisConfig', label: 'Get Genesis Config' },
  getProtocolConfig: { value: 'getProtocolConfig', label: 'Get Protocol Config' },

  getNetworkInfo: { value: 'getNetworkInfo', label: 'Get Network Info' },
  getNodeStatus: { value: 'getNodeStatus', label: 'Get Node Status' },
  getGasPrice: { value: 'getGasPrice', label: 'Get Gas Price' },

  getValidators: { value: 'getValidators', label: 'Get Validators' },
  getMaintenanceWindows: { value: 'getMaintenanceWindows', label: 'Get Maintenance Windows' },
};

export const config = {
  finality,
  waitUntil,
  methodNames,
};
