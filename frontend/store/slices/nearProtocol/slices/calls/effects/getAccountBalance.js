import { effect } from '../../../../../../../react-vault/index.js';
import { connect, utils } from 'near-api-js';

const truncateNumber = (number) => {
  return number.toString().replace(/(\.\d{2})\d*$/, '$1');
};

export const getAccountBalance = effect(async ({ payload, store }) => {
  const { accountId } = payload;
  const networkId = store.getState((store) => store.networks.current.networkId);
  const rpc = store.getState((store) => store.networks.current.url.rpc);

  try {
    const config = {
      networkId: networkId,
      nodeUrl: rpc,
    };

    const connection = await connect(config);
    const account = await connection.account(accountId);
    const balance = await account.getAccountBalance();

    return truncateNumber(utils.format.formatNearAmount(balance.available));
  } catch (e) {
    console.log(e);
  }
});
