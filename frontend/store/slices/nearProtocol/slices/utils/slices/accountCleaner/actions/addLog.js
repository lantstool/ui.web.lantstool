import { action } from '@react-vault';

export const addLog = action(({ slice, payload }) => {
  const { spaceId, networkId, log } = payload;
  slice[spaceId][networkId].operationProgress.logs.push(log);
});
