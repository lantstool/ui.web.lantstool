import { chunk } from 'lodash/array.js';
import pRetry from 'p-retry';

const deleteChunkKeys = async ({
  rpc,
  keyChunk,
  signerId,
  signerPublicKey,
  spaceId,
  networkId,
  logger,
}) => {
  const actions = keyChunk.map((publicKey) => ({ type: 'DeleteKey', publicKey }));

  await pRetry(
    () =>
      rpc.createAndSendTransaction({
        signerId,
        signerPublicKey,
        actions,
        receiverId: signerId,
        spaceId,
        networkId,
        waitUntil: 'EXECUTED',
      }),
    {
      retries: 3, // Every new request will be sent to the new random RPC;
      onFailedAttempt: (error) => {
        logger.error(
          `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left`,
        );
      },
    },
  );
};

export const deleteAccessKeys = async ({
  rpc,
  signerId,
  signerPublicKey,
  spaceId,
  networkId,
  chunkSize = 100, // We can maximum add 100 actions to a single transaction;
  logger,
}) => {
  logger.info(`Starting to delete access keys for ${signerId}`);

  const rpcUrl = networkId === 'mainnet' ? 'https://rpc.intea.rs' : 'https://testnet-rpc.intea.rs';
  await rpc.specify({ url: rpcUrl, headers: [] });

  // RPC call return all account keys;
  const { keys } = await rpc.getAccountKeys({ accountId: signerId });

  // We want to keep 1 Full Access key and remove all others;
  const removeList = keys
    .filter((key) => key.publicKey !== signerPublicKey)
    .map((key) => key.publicKey);

  logger.info(`${keys.length} access keys found - ${removeList.length} will be deleted`);
  if (removeList.length === 0) return;

  // split all keys to portions
  const chunks = chunk(removeList, chunkSize);

  for (let i = 0; i < chunks.length; i++) {
    const keyChunk = chunks[i];

    const from = i * chunkSize + 1;
    const to = from + keyChunk.length - 1;
    logger.info(`Deleting access keys ${from}-${to}...`);

    await deleteChunkKeys({
      rpc,
      keyChunk,
      signerId,
      signerPublicKey,
      spaceId,
      networkId,
      logger,
    });
  }

  logger.info(`${removeList.length} access keys deleted successfully`);
};
