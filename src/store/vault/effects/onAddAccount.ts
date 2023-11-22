import { effect } from '../../../react-vault';
import { connect } from 'near-api-js';

const near = await connect({
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://testnet.mynearwallet.com',
});

export const onAddAccount = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const addAccount = slice.getActions((slice: any) => slice.addAccount);
  const accList = store.getState((store: any) => store.vault.list);
  const accountId = payload.data.accountId;
  const filterAcc = accList.find((acc: any) => acc === accountId);

  try {
    if (filterAcc !== undefined) {
      return console.log('Account already exists');
    }
    const response = await near.connection.provider.query({
      request_type: 'view_account',
      finality: 'final',
      account_id: accountId,
    });
    console.log(response);
    const account = {
      accountId,
    };

    await idb.add('vault', account);
    addAccount({ accountId });
    payload(false)
  } catch (e) {
    console.log(e);
  }
});
