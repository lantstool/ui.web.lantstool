import { action } from '../../../../react-vault/index.js';
import { v1 } from 'uuid';

const createResult = (transactionId, result) => {
  const resultId = v1();
  return {
    resultId,
    createdAt: new Date(),
    transactionId,
    result,
  };
};

export const addResult = action(({ slice, payload }) => {
  const { transactionId, result } = payload;
  const txResult = createResult(transactionId, result);

  slice.map[transactionId].results.records.push(txResult);
  slice.map[transactionId].results.currentResult = txResult.resultId;
  slice.map[transactionId].results.isLoading = false;
});
