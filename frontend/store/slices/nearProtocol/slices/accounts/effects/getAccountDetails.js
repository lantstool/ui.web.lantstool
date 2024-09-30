import { effect } from '../../../../../../../react-vault/index.js';
import { viewAccount } from '../../../../../helpers/rpc/viewAccount.js';
import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { connect } from 'near-api-js';


export const getAccountDetails = effect(async ({ payload, store, slice }) => {
  const { spaceId, networkId, accountId } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const setAccountDetails = slice.getActions((slice) => slice.setAccountDetails);

  try {
    const { activeRpc } = await backend.sendRequest('nearProtocol.networks.getOne', {
      spaceId,
      networkId,
    });

    const config = {
      networkId: networkId,
      nodeUrl: activeRpc,
    };

    const response = await viewAccount(accountId, activeRpc);
    const details = toCamelCase(response.result);

    const connection = await connect(config);
    const account = await connection.account(accountId);
    const balance = await account.getAccountBalance();

    setAccountDetails({ accountId, details, balance });
  } catch (e) {
    console.log(e);
  }
});
