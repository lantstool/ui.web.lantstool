import { action } from '@react-vault';

const getDefaultValues = () => ({
  getAccount: {
    method: { value: 'getAccount', label: 'Get Account' },
    accountId: null,
    blockTarget: 'latest',
    finality: { value: 'final', label: 'Final' },
    blockId: '',
  },
  getAccountChanges: {
    method: { value: 'getAccountChanges', label: 'Get Account Changes' },
    accountIds: [{ accountId: null }],
    blockTarget: 'specific',
    finality: { value: 'final', label: 'Final' },
    blockId: '',
  },
  getContractWasm: {
    method: { value: 'getContractWasm', label: 'Get Contract WASM', },
    contractId: null,
    blockTarget: 'latest',
    finality: { value: 'final', label: 'Final' },
    blockId: '',
  },
  getContractState: {
    method: { value: 'getContractState', label: 'Get Contract State' },
    contractId: null,
    keyPrefix: '',
    blockTarget: 'latest',
    finality: { value: 'final', label: 'Final' },
    blockId: '',
  },
  callContractViewMethod: {
    method: { value: 'callContractViewMethod', label: 'Call Contract View Method' },
    contractId: null,
    methodName: null,
    args: '',
    blockTarget: 'latest',
    finality: { value: 'final', label: 'Final' },
    blockId: '',
  },
});

export const setupDraft = action(({ slice, payload: call }) => {
  const { callId, body } = call;

  slice.drafts[callId] = {
    origin: call,
    currentMethod: body.method.value,
    ...getDefaultValues(),
    [body.method.value]: body,
  };
});
