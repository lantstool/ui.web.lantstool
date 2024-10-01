import { effect } from '../../../../../../../react-vault/index.js';
import { viewAccount } from '../../../../../helpers/rpc/viewAccount.js';
import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { connect } from 'near-api-js';

export const getAccountDetails = effect(async ({ payload, store, slice }) => {
  const { spaceId, networkId, accountId } = payload;
  const getActiveRpc = store.getEffects((store) => store.nearProtocol.networks.getActiveRpc);
  const setAccountDetails = slice.getActions((slice) => slice.setAccountDetails);

  try {
    const rpc = await getActiveRpc({ spaceId, networkId });

    const config = {
      networkId: networkId,
      nodeUrl: rpc,
    };

    const response = await viewAccount(accountId, rpc);
    const details = toCamelCase(response.result);

    const connection = await connect(config);
    const account = await connection.account(accountId);
    const balance = await account.getAccountBalance();

    setAccountDetails({ accountId, details, balance });
  } catch (e) {
    console.log(e);
  }
});
