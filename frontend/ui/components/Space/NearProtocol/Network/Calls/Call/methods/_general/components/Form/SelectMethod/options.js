import { config } from '../../../config.js';

const { methodNames } = config;

export const options = [
  {
    label: 'Account',
    options: [methodNames.getAccount, methodNames.getAccountChanges],
  },
  {
    label: 'Contract',
    options: [
      methodNames.getContractWasm,
      methodNames.getContractWasmChanges,
      methodNames.getContractState,
      methodNames.getContractStateChanges,
      methodNames.callContractViewMethod,
    ],
  },
  {
    label: 'Keys',
    options: [
      methodNames.getAccountKey,
      methodNames.getChangesForAccountKey,
      methodNames.getAccountKeys,
      methodNames.getChangesForAccountKeys,
    ],
  },
  {
    label: 'Block',
    options: [methodNames.getBlock, methodNames.getBlockChanges, methodNames.getChunk],
  },
  {
    label: 'Transaction',
    options: [
      methodNames.getTransaction,
      methodNames.getDetailedTransaction,
      methodNames.getReceipt,
    ],
  },
  {
    label: 'Protocol',
    options: [methodNames.getGenesisConfig, methodNames.getProtocolConfig],
  },
  {
    label: 'Network',
    options: [methodNames.getNetworkInfo, methodNames.getNodeStatus, methodNames.getGasPrice],
  },
  {
    label: 'Validators',
    options: [methodNames.getValidators, methodNames.getMaintenanceWindows],
  },
];
