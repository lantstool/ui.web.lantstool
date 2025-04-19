import { chunk } from 'lodash/array.js';
import pRetry from 'p-retry';

const deleteChunkKeys = async ({ rpc, keyChunk, signerId, signerPublicKey, spaceId, networkId }) => {
  const actions = keyChunk.map((publicKey) => ({ type: 'DeleteKey', publicKey }));

  const result = await pRetry(
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
      retries: 2, // Every new request will be sent to the new random RPC;
      onFailedAttempt: (error) => {
        console.log(
          `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left`,
        );
      },
    },
  );

  console.log('Deleted chunk:', result);
};

export const deleteAccessKeys = async ({ rpc, signerId, signerPublicKey, spaceId, networkId }) => {
  await rpc.configure({ spaceId, networkId });

  // RPC call return all account keys;
  const { keys } = await rpc.getAccountKeys({ accountId: signerId });

  // We want to keep 1 Full Access key and remove all others;
  const removeList = keys
    .filter((key) => key.publicKey !== signerPublicKey)
    .map((key) => key.publicKey);

  // We can maximum add 100 actions to a single transaction;
  const chunks = chunk(removeList, 100);

  for (const keyChunk of chunks) {
    await deleteChunkKeys({
      rpc,
      keyChunk,
      signerId,
      signerPublicKey,
      spaceId,
      networkId,
    });
  }
};
