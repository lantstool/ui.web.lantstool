import { effect } from '@react-vault';
import { deleteAccessKeys } from './deleteAccessKeys.js';

// Runs only on mainnet
export const runAccountCleaner = effect(async ({ store, payload }) => {
  const { formValues, spaceId, networkId } = payload;
  const {
    signerId: { value: signerId },
    signerKey: { value: signerPublicKey },
    mode,
  } = formValues;
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);

  return console.log(formValues);

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
