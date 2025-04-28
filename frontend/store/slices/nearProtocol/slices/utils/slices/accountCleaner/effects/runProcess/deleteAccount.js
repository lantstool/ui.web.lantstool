import { clearContractState } from './clearContractState/clearContractState.js';
import { deleteAccessKeys } from './deleteAccessKeys.js';

export const deleteAccount = async ({
  rpc,
  signerId,
  signerPublicKey,
  spaceId,
  networkId,
  logger,
  beneficiaryId,
}) => {
  await deleteAccessKeys({
    rpc,
    signerId,
    signerPublicKey,
    spaceId,
    networkId,
    logger,
  });

  await clearContractState({
    rpc,
    signerId,
    signerPublicKey,
    spaceId,
    networkId,
    logger,
  });

  await rpc.createAndSendTransaction({
    signerId,
    signerPublicKey,
    actions: [{ type: 'DeleteAccount', beneficiaryId }],
    receiverId: signerId,
    spaceId,
    networkId,
  });

  logger.info(`${signerId} deleted successfully. Remaining tokens sent to ${beneficiaryId} `);
};
