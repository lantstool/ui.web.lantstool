import { effect } from '../../../../react-vault';
import { connect, keyStores, utils } from 'near-api-js';

const truncateNumber = (number: any) => {
  return number.toString().replace(/(\.\d{2})\d*$/, '$1');
};

export const getAccountBalance = effect(async ({ payload, store }: any) => {
  const { accountId } = payload;
  const networkName = store.getState((store: any) => store.networks.current.name);

  const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

  try {
    const config = {
      networkId: networkName,
      keyStore: myKeyStore,
      nodeUrl: `https://rpc.${networkName}.near.org`,
      walletUrl: `https://wallet.${networkName}.near.org`,
      explorerUrl: `https://explorer.${networkName}.near.org`,
    };

    const connection = await connect(config);
    const account = await connection.account(accountId);
    const balance = await account.getAccountBalance();

    return truncateNumber(utils.format.formatNearAmount(balance.available));
  } catch (e) {
    console.log(e);
  }
});
