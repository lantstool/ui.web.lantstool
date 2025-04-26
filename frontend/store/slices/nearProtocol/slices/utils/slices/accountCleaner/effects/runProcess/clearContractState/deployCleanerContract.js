const CLEANER_CONTRACT_URL =
  'https://raw.githubusercontent.com/' +
  'near/' +
  'core-contracts/' +
  'master/' +
  'state-manipulation/res/state_cleanup.wasm';

const CLEANER_CONTRACT_WASM_HASH = 'J34Q5DybRqaTbzSnCtEtm6oSP2cCvDvAHBA831TLUZ4E';

const fetchCleanerContract = async () => {
  try {
    const response = await fetch(CLEANER_CONTRACT_URL);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    throw new Error(`Error while fetching the state cleaner contract: ${error.message}`);
  }
};

export const deployCleanerContract = async ({
  rpc,
  signerId,
  signerPublicKey,
  spaceId,
  networkId,
}) => {
  // 1. Check if it has the cleaner contract already deployed;
  const { codeHash } = await rpc.getAccount({ accountId: signerId});
  if (codeHash === CLEANER_CONTRACT_WASM_HASH) return;

  // 2. Download the contract from GitHub;
  const u8Contract = await fetchCleanerContract();

  // 3. Deploy contract on the account;
  await rpc.createAndSendTransaction({
    signerId,
    signerPublicKey,
    actions: [{ type: 'DeployContract', u8Contract }],
    receiverId: signerId,
    spaceId,
    networkId,
    waitUntil: 'FINAL',
  });
};
