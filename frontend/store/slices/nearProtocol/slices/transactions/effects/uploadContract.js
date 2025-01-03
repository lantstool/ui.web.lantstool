import { effect } from '@react-vault';

export const uploadContract = effect(async ({ store, payload }) => {
  const { transactionId, actionIndex, file, setFieldValue } = payload;
  const [backend] = store.getEntities((store) => store.backend);

  try {
    const fileName = await backend.sendRequest('nearProtocol.transactions.uploadContractToMemory', {
      transactionId,
      actionIndex,
      file,
    });
    setFieldValue(fileName);
  } catch (e) {
    console.log(e);
  }
});
