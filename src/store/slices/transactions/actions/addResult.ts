import { action } from '../../../../react-vault';
import { v1 } from 'uuid';

const createResult = (transactionId: string, result: any) => {
  const resultId = v1();
  return {
    resultId,
    createdAt: new Date(),
    transactionId,
    result,
  };
};

export const addResult = action(({ slice, payload }: any) => {
  const { transactionId, result } = payload;
  const txResult = createResult(transactionId, result);

  slice.map[transactionId].results.records.push(txResult);
  slice.map[transactionId].results.currentResult = txResult.resultId;
  slice.map[transactionId].results.isLoading = false;
});
