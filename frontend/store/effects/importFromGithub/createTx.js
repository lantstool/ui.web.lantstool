import { transactionConfig } from '../../../ui/components/Space/NearProtocol/Network/Transactions/_general/transactionConfig.js';
import { extractContracts } from '../../slices/nearProtocol/slices/transactions/effects/importOne/helpers/extractContracts.js';
import { transformBodyForImport } from '../../slices/nearProtocol/slices/transactions/effects/importOne/helpers/transformBodyForImport.js';

export const createTx = async ({
  json,
  store,
  backend,
  networkId,
  spaceId,
  navigate,
  setNotification,
}) => {
  const body = await transformBodyForImport(json.transaction, store, transactionConfig);
  const { contracts, bodyWithoutBase64Files } = extractContracts(body);

  const transaction = await backend.sendRequest('nearProtocol.transactions.importOne', {
    spaceId,
    networkId,
    name: json.transaction.name,
    body: bodyWithoutBase64Files,
    contracts,
  });

  navigate(
    `/space/${spaceId}/near-protocol/${networkId}/transactions/${transaction.transactionId}`,
    { relative: 'path', replace: true },
  );

  setTimeout(
    () =>
      setNotification({
        isOpen: true,
        message: 'Transaction imported successfully',
        variant: 'success',
      }),
    100,
  );
};
