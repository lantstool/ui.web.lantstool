import { deletePage } from './deletePage.js';

export const deleteState = async ({
  rpc,
  signerId,
  signerPublicKey,
  spaceId,
  networkId,
  logger,
}) => {
  const state = {
    nextCursor: null,
    startDeletionFrom: 1,
  };

  do {
    await deletePage({
      state,
      rpc,
      signerId,
      signerPublicKey,
      spaceId,
      networkId,
      logger,
    });
  } while (state.nextCursor);
};
