import { chunk } from 'lodash/array.js';
import { transactions } from 'near-api-js';
import pRetry from 'p-retry';


const MAX_GAS_PER_TX = 250n * 1000000000000n; // 250 TGas

// Fetch the cleaner contract from GitHub
const fetchCleanerContract = async (logger) => {
  logger.info('Fetching state cleaner contract from GitHub...');
  try {
    const response = await fetch(CLEANER_CONTRACT_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch cleaner contract: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    logger.error(`Error fetching cleaner contract: ${error.message}`);
    throw error;
  }
};

// Check if the account has a deployed contract
const hasDeployedContract = async (rpc, accountId) => {
  const account = await rpc.getAccount({ accountId });
  return account.codeHash !== '11111111111111111111111111111111';
};

// Deploy the cleaner contract if needed
const deployCleanerContractIfNeeded = async ({
  rpc,
  signerId,
  signerPublicKey,
  logger,
  spaceId,
  networkId,
}) => {
  // Check if the account already has a deployed contract
  const hasContract = await hasDeployedContract(rpc, signerId);

  if (hasContract) {
    logger.info('Account already has a deployed contract. Skipping deployment.');
    return;
  }

  logger.info('Deploying state cleaner contract...');

  // Fetch the cleaner contract
  const contractCode = await fetchCleanerContract(logger);

  // Deploy the contract
  await pRetry(
    () =>
      rpc.createAndSendTransaction({
        signerId,
        signerPublicKey,
        actions: [{ type: 'DeployContract', u8Contract: contractCode }],
        receiverId: signerId,
        spaceId,
        networkId,
        waitUntil: 'EXECUTED',
      }),
    {
      retries: 3,
      onFailedAttempt: (error) => {
        logger.error(
          `Deployment attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left`,
        );
      },
    },
  );

  logger.success('State cleaner contract deployed successfully');
};

// Get state keys from the account
const getStateKeys = async (rpc, accountId, prefix = '', limit = 100) => {
  const response = await rpc.getContractState({
    contractId: accountId,
    keyPrefix: prefix,
  });

  return {
    keys: response.values.map(item => item.key),
    nextPageKey: response.nextPageKey || null
  };
};

// Delete state keys in chunks
const deleteStateKeysChunk = async ({
  rpc,
  keys,
  signerId,
  signerPublicKey,
  spaceId,
  networkId,
  logger,
}) => {
  if (keys.length === 0) return;

  const functionCallAction = {
    type: 'FunctionCall',
    methodName: { value: 'clean' },
    args: { keys },
    gas: { unit: 'TGas', amount: '250' },
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
      retries: 3,
      onFailedAttempt: (error) => {
        logger.error(
          `Delete keys attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left`,
        );
      },
    },
  );
};

export const clearContractStateAction = async ({
  rpc,
  signerId,
  signerPublicKey,
  spaceId,
  networkId,
  logger,
  setOperationStatus,
  chunkSize = 50, // Number of keys to delete in a single transaction
}) => {
  logger.info(`Starting to clear contract state for ${signerId}`);

  try {
    // Configure RPC
    await rpc.configure({ spaceId, networkId });

    // Check if the account has a deployed contract
    const hasContract = await hasDeployedContract(rpc, signerId);

    if (!hasContract) {
      logger.info('Account does not have a deployed contract. Nothing to clear.');
      return;
    }

    // Deploy the cleaner contract if needed
    await deployCleanerContractIfNeeded({
      rpc,
      signerId,
      signerPublicKey,
      logger,
      spaceId,
      networkId,
    });

    // Get state keys and delete them in chunks
    let nextPageKey = '';
    let totalKeysDeleted = 0;

    do {
      // Get a batch of state keys
      const { keys, nextPageKey: newNextPageKey } = await getStateKeys(rpc, signerId, nextPageKey);
      nextPageKey = newNextPageKey;

      if (keys.length === 0) {
        logger.info('No more state keys to delete');
        break;
      }

      logger.info(`Found ${keys.length} state keys to delete`);

      // Split keys into chunks
      const keyChunks = chunk(keys, chunkSize);

      for (let i = 0; i < keyChunks.length; i++) {
        const keyChunk = keyChunks[i];

        const from = totalKeysDeleted + 1;
        const to = from + keyChunk.length - 1;
        logger.info(`Deleting state keys ${from}-${to}...`);

        await deleteStateKeysChunk({
          rpc,
          keys: keyChunk,
          signerId,
          signerPublicKey,
          spaceId,
          networkId,
          logger,
        });

        totalKeysDeleted += keyChunk.length;
      }

    } while (nextPageKey);

    logger.success(`${totalKeysDeleted} state keys deleted successfully`);
  } catch (error) {
    logger.error(`Failed to clear contract state: ${error.message}`);
    throw error;
  }
};
