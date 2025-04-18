import { effect } from '@react-vault';
import { removeAccessKeys } from './removeAccessKeys.js';

// Runs only on mainnet
export const runAccountCleaner = effect(async ({ store, payload }) => {
  const { formValues, spaceId, networkId } = payload;
  const {
    signerId: { value: signerId },
    signerKey: { value: signerPublicKey },
    mode,
  } = formValues;
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);

  try {
    if (mode === 'removeAccessKeys')
      await removeAccessKeys({
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
