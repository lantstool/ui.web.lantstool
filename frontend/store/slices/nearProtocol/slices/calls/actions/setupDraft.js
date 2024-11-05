import { action } from '@react-vault';

const getDefaultValues = () => ({
  getAccount: {
    accountId: '',
    blockTarget: 'latest',
    finality: { value: 'final', label: 'Final' },
    blockId: '',
  },
  getAccountChanges: {
    accountIds: [{ accountId: '' }],
    blockTarget: 'specific',
    finality: { value: 'final', label: 'Final' },
    blockId: '',
  },
});

export const setupDraft = action(({ slice, payload }) => {
  const { call } = payload;
  slice.drafts[call.callId] = {
    origin: call,
    currentMethod: call.method,
  };
});
