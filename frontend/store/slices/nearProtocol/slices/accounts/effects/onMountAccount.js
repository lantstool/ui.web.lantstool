import { effect } from '../../../../../../../react-vault/index.js';
import { viewAccount } from '../../../../../helpers/rpc/viewAccount.js';
import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { connect } from 'near-api-js';

export const onMountAccount = effect(async ({ payload: accountId, store, slice }) => {
  const { rpc } = store.getState((store) => store.networks.current.url);
  const setAccountChainDetails = slice.getActions((slice) => slice.setAccountChainDetails);
  const networkId = store.getState((store) => store.networks.current.networkId);
  const getKeyList = store.getEffects((store) => store.accounts.getKeyList);

  try {
    const config = {
      networkId: networkId,
      nodeUrl: rpc,
    };

    const response = await viewAccount(accountId, rpc);
    const connection = await connect(config);
    const account = await connection.account(accountId);
    const balance = await account.getAccountBalance();
    setAccountChainDetails({ accountId, details: toCamelCase(response.result), balance });

    await getKeyList(accountId);
  } catch (e) {
    console.log(e);
  }
});
