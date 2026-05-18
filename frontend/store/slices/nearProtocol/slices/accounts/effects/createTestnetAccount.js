import { effect } from '@react-vault';
import { KEY_DERIVATION_PATH, generateSeedPhrase } from 'near-seed-phrase';

export const createTestnetAccount = effect(async ({ store, slice, payload }) => {
  const { accountId, spaceId, networkId, closeModal } = payload;
  const tmpAccountId = `${crypto.randomUUID()}.testnet`;
  const [backend] = store.getEntities((store) => store.backend);
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const setAccount = slice.getActions((slice) => slice.setAccount);
  const addKeyToList = store.getActions((store) => store.nearProtocol.keys.addKeyToList);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    const { publicKey, seedPhrase, secretKey } = generateSeedPhrase();

    // 0. Check if accountId or key already exist in SQLite (avoid duplicates)
    const existingAccount = await backend.sendRequest('nearProtocol.accounts.getOne', {
      spaceId,
      networkId,
      accountId,
    });
    const existingKey = await backend.sendRequest('nearProtocol.keys.getPublicKey', {
      spaceId,
      networkId,
      publicKey,
    });

    // 1. Create <uuid>.testnet account through NEAR helper
    const helperResponse = await fetch(import.meta.env.VITE_CREATE_TESTNET_ACCOUNT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newAccountId: tmpAccountId,
        newAccountPublicKey: publicKey,
      }),
    });

    if (!helperResponse.ok) {
      const text = await helperResponse.text();
      throw new Error(text || 'Create account service not working. Try again later.');
    }

    const helperData = await helperResponse.json();
    const failureKind = helperData?.status?.Failure?.ActionError?.kind;

    if (failureKind) {
      throw new Error(`Error: ${Object.keys(failureKind)[0]}.`);
    }

    await rpc.configure({ spaceId, networkId });

    // 2. Delete tmpAccountId and forwards all 10 NEAR to master.
    const deleteTxOutcome = await rpc.createAndSendTransaction({
      signerId: tmpAccountId,
      signerPublicKey: publicKey,
      signerPrivateKey: secretKey,
      receiverId: tmpAccountId,
      actions: [{ type: 'DeleteAccount', beneficiaryId: import.meta.env.VITE_MASTER_ACCOUNT_ID }],
    });

    const deleteTxHash = deleteTxOutcome?.transaction?.hash;

    // 4. Ask backend to verify DeleteAccount tx and create the real sub-account
    const subAccountResponse = await fetch(import.meta.env.VITE_CREATE_SUB_ACCOUNT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newAccountId: accountId,
        newAccountPublicKey: publicKey,
        tmpAccountId,
        transactionHash: deleteTxHash,
      }),
    });

    if (!subAccountResponse.ok) {
      const { message } = await subAccountResponse.json();
      throw new Error(message);
    }

    // 5. Save account in SQLite — only if not already present locally
    if (!existingAccount) {
      const account = await backend.sendRequest('nearProtocol.accounts.create', {
        accountId,
        spaceId,
        networkId,
        note: '',
      });
      setAccount(account);
    }

    // 6. Save key in SQLite — only if not already present locally
    if (!existingKey) {
      const key = await backend.sendRequest('nearProtocol.keys.create', {
        publicKey,
        privateKey: secretKey,
        seedPhrase,
        derivationPath: KEY_DERIVATION_PATH,
        spaceId,
        networkId,
      });
      addKeyToList(key);
    }

    setNotification({
      isOpen: true,
      message: 'Account created successfully',
      variant: 'success',
    });
    closeModal();
  } catch (e) {
    closeModal();
    console.log(e);
    setNotification({
      isOpen: true,
      message: e.message || 'Failed to create testnet account',
      variant: 'error',
      delay: 5000,
    });
  }
});
