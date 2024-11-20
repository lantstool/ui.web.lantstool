import { action } from '@react-vault';

export const editOneRpcType = action(({ slice, payload }) => {
  const { callId, rpcType } = payload;
  slice.drafts[callId].origin.rpcType = rpcType;
});
