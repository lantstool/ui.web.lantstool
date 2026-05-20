import { effect } from '@react-vault';
import { generateSeedPhrase } from 'near-seed-phrase';

export const getFaucetTokensTestnet = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, accountId, setIsFaucetPending } = payload;
  const tmpAccountId = `${crypto.randomUUID()}.testnet`;
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const setNotification = store.getActions((store) => store.setNotification);
  const getAccountDetails = slice.getEffects((slice) => slice.getAccountDetails);

  try {
    setIsFaucetPending(true);
    const { publicKey, secretKey } = generateSeedPhrase();

    // 1. Create <uuid>.testnet account through NEAR helper (gives ~10 NEAR)
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
      throw new Error(text || 'Faucet service not working. Try again later.');
    }

    const helperData = await helperResponse.json();
    const failureKind = helperData?.status?.Failure?.ActionError?.kind;

    if (failureKind) {
      throw new Error(`Error: ${Object.keys(failureKind)[0]}.`);
    }

    await rpc.configure({ spaceId, networkId });

    // 2. Delete tmpAccountId and forward all 10 NEAR to master.
    const deleteTxOutcome = await rpc.createAndSendTransaction({
      signerId: tmpAccountId,
      signerPublicKey: publicKey,
      signerPrivateKey: secretKey,
      receiverId: tmpAccountId,
      actions: [{ type: 'DeleteAccount', beneficiaryId: import.meta.env.VITE_MASTER_ACCOUNT_ID }],
    });

    const deleteTxHash = deleteTxOutcome?.transaction?.hash;

    // 3. Ask backend to verify DeleteAccount tx and Transfer tokens
    //    from master to the target account.
    const faucetResponse = await fetch(import.meta.env.VITE_FAUCET_TOKENS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountId,
        tmpAccountId,
        transactionHash: deleteTxHash,
      }),
    });

    if (!faucetResponse.ok) {
      const { message } = await faucetResponse.json();
      throw new Error(message);
    }

    // 4. Refetch account details to show updated balance
    getAccountDetails({ spaceId, networkId, accountId });
    setIsFaucetPending(false);

    setNotification({
      isOpen: true,
      message: `Tokens sent to ${accountId} successfully`,
      variant: 'success',
    });
  } catch (e) {
    console.log(e);
    setIsFaucetPending(false);
    setNotification({
      isOpen: true,
      message: e.message || 'Failed to get faucet tokens',
      variant: 'error',
      delay: 5000,
    });
  }
});
