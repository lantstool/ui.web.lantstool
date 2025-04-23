import { action } from '@react-vault';

export const setOperationStatus = action(({ slice, payload }) => {
  const { spaceId, networkId, status } = payload;
  slice[spaceId][networkId].operationProgress.status = status;
});
