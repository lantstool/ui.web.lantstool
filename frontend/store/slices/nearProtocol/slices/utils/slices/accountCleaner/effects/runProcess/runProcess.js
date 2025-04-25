import { effect } from '@react-vault';
import { deleteAccessKeys } from './deleteAccessKeys.js';
import { createLogger } from './createLogger.js';

// Runs only on mainnet
export const runProcess = effect(async ({ store, slice, payload }) => {
  const { formValues, spaceId, networkId, closeModal } = payload;
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const goToStep = slice.getActions((slice) => slice.goToStep);
  const setOperationStatus = slice.getActions((slice) => slice.setOperationStatus);
  const addLog = slice.getActions((slice) => slice.addLog);

  const signerId = formValues.signerId.value;
  const signerPublicKey = formValues.signerKey.value;
  const mode = formValues.mode;
  const beneficiaryId = formValues.beneficiaryId?.value;
  const logger = createLogger({ addLog, spaceId, networkId });

  closeModal();
  goToStep({ spaceId, networkId, step: 'operation-progress' });

  try {
    if (mode === 'deleteAccessKeys')
      await deleteAccessKeys({
        rpc,
        signerId,
        signerPublicKey,
        spaceId,
        networkId,
        logger,
        setOperationStatus,
        chunkSize: 3,
      });
  } catch (e) {
    logger.error(`Operation failed: ${e.message}`);
  } finally {
    setOperationStatus({ spaceId, networkId, status: 'completed' });
  }
});
