import { effect } from '@react-vault';
import { deleteAccessKeys } from './deleteAccessKeys.js';
import { clearContractState } from './clearContractState/clearContractState.js';
import { deleteAccount } from './deleteAccount.js';
import { createLogger } from './createLogger.js';

// Runs only on mainnet and testnet
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
    if (mode === 'deleteAccessKeys') {
      await deleteAccessKeys({
        rpc,
        signerId,
        signerPublicKey,
        spaceId,
        networkId,
        logger,
      });
    }

    if (mode === 'clearContractState') {
      await clearContractState({
        rpc,
        signerId,
        signerPublicKey,
        spaceId,
        networkId,
        logger,
      });
    }

    if (mode === 'deleteAccount') {
      await deleteAccount({
        rpc,
        signerId,
        signerPublicKey,
        spaceId,
        networkId,
        logger,
        beneficiaryId,
      });
    }

    logger.success('Operation completed successfully');
  } catch (e) {
    logger.error(`Operation failed: ${e.message}`);
  } finally {
    setOperationStatus({ spaceId, networkId, status: 'completed' });
  }
});
