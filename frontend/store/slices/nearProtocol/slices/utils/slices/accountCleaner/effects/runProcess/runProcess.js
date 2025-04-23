import { effect } from '@react-vault';
import { deleteAccessKeys } from './deleteAccessKeys.js';
import { mockLogger } from './mockLogger.js';

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

  console.log(formValues);

  closeModal();
  goToStep({ spaceId, networkId, step: 'operation-progress' });

  await mockLogger({ addLog, spaceId, networkId, setOperationStatus });
  return;
  try {
    if (mode === 'deleteAccessKeys')
      await deleteAccessKeys({
        rpc,
        signerId,
        signerPublicKey,
        spaceId,
        networkId,
      });
  } catch (e) {
    console.log(e);
  }
});
