import { viewStatePaginated } from './viewStatePaginated.js';
import { deployCleanerContract } from './deployCleanerContract.js';
import { deleteState } from './deleteState/deleteState.js';

export const clearContractState = async ({
  rpc,
  signerId,
  signerPublicKey,
  spaceId,
  networkId,
  logger,
}) => {
  logger.info(`Starting to clear the contract state of ${signerId}`);

  // 1. Check if account has state;
  logger.info(`Checking if the account has state...`);

  const state = await viewStatePaginated({ networkId, accountId: signerId });
  // No key-value pairs = no state
  if (!(state.values.length > 0)) {
    logger.info(`Account ${signerId} has no state. Nothing to clear`);
    return;
  }

  // 2. Deploy the cleaner contract if needed
  logger.info(`Deploying the cleaner contract on the account...`);

  await deployCleanerContract({
    rpc,
    signerId,
    signerPublicKey,
    spaceId,
    networkId,
    logger,
  });

  // 3. Delete all key-value pairs from the state;
  logger.info(`Starting to delete key-value pairs...`);

  await deleteState({
    rpc,
    signerId,
    signerPublicKey,
    spaceId,
    networkId,
    logger,
  });

  logger.info(`Contract state was cleared successfully`);
};
