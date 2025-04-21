import { effect } from '@react-vault';
import { deleteAccessKeys } from './deleteAccessKeys.js';

// Runs only on mainnet
export const runProcess = effect(async ({ store, slice, payload }) => {
  const { formValues, spaceId, networkId, closeModal } = payload;
  const signerId = formValues.signerId.value;
  const signerPublicKey = formValues.signerKey.value;
  const mode = formValues.mode;
  const beneficiaryId = formValues.beneficiaryId?.value;
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const gotToStep = slice.getActions((slice) => slice.gotToStep);

  console.log(formValues);

  closeModal();
  gotToStep({ spaceId, networkId, step: 'progress' });

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
