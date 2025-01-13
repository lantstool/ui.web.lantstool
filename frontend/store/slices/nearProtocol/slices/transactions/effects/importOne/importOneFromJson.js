import { effect } from '@react-vault';
import { transformBodyForImport } from './helpers/transformBodyForImport.js';
import { extractContracts } from './helpers/extractContracts.js';

export const importOneFromJson = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, formValues, navigate, closeModal, transactionConfig } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const pushTxToList = slice.getActions((slice) => slice.pushTxToList);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    const body = await transformBodyForImport(
      formValues.json.transaction,
      store,
      transactionConfig,
    );
    const { contracts, bodyWithoutBase64Files } = extractContracts(body);

    const transaction = await backend.sendRequest('nearProtocol.transactions.importOne', {
      spaceId,
      networkId,
      name: formValues.json.transaction.name,
      body: bodyWithoutBase64Files,
      contracts,
    });

    pushTxToList(transaction);
    navigate(`${transaction.transactionId}`);
    closeModal();

    setTimeout(
      () =>
        setNotification({
          isOpen: true,
          message: 'Transaction imported successfully',
          variant: 'success',
        }),
      100,
    );
  } catch (e) {
    console.log(e);
  }
});
