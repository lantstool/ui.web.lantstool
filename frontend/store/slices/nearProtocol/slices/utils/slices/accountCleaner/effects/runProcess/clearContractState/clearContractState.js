import { viewStatePaginated } from './viewStatePaginated.js';

export const clearContractState = async ({
  rpc,
  signerId,
  signerPublicKey,
  spaceId,
  networkId,
  logger,
}) => {
  // 1. Check if account has state;
  logger.info(`Starting to clear the contract state of ${signerId}`);

  const state = await viewStatePaginated({ accountId: signerId, rpc });
  // No key-value pairs = no state
  if (!(state.values.length > 0)) {
    logger.info(`Account ${signerId} has no state. Nothing to clear`);
    return;
  }

  // logger.info(`Account ${signerId} has state. Proceeding with state clearing...`);

  // 2. Check if the account has enough balance to cover a deployment the cleanup contract
};
