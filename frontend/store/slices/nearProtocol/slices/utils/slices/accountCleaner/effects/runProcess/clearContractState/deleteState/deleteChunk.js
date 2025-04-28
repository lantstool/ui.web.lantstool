import pRetry from 'p-retry';

export const deleteChunk = async ({
  rpc,
  keys,
  signerId,
  signerPublicKey,
  spaceId,
  networkId,
  logger,
}) => {
  const functionCallAction = {
    type: 'FunctionCall',
    methodName: { value: 'clean' },
    args: { keys },
    gas: { unit: 'TGas', amount: '300' },
    deposit: { unit: 'yoctoNEAR', amount: '0' },
  };

  await pRetry(
    () =>
      rpc.createAndSendTransaction({
        signerId,
        signerPublicKey,
        actions: [functionCallAction],
        receiverId: signerId,
        spaceId,
        networkId,
        waitUntil: 'EXECUTED',
      }),
    {
      retries: 2,
      onFailedAttempt: (error) => {
        logger.error(
          `Delete keys attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left`,
        );
      },
    },
  );
};
