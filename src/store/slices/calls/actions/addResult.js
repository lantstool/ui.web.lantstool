import { action } from '../../../../react-vault';
import { v1 } from 'uuid';

const createResult = (callId, result) => {
  const resultId = v1();
  return {
    resultId,
    createdAt: new Date(),
    callId,
    result,
  };
};

export const addResult = action(({ slice, payload }) => {
  const { callId, result } = payload;
  const callResult = createResult(callId, result);

  slice.records[callId].results.records.push(callResult);
  slice.records[callId].results.currentResult = callResult.resultId;
  slice.records[callId].results.isLoading = false;
});
