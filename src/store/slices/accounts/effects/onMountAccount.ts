import { effect } from '../../../../react-vault';
import { viewAccount } from '../../../helpers/rpc/viewAccount.ts';
import { toCamelCase } from '../../../helpers/toCamelCase.ts';
import { connect } from 'near-api-js';

export const onMountAccount = effect(async ({ payload: accountId, store, slice }: any) => {
  const { rpc } = store.getState((store: any) => store.networks.current.url);
  const setAccountChainDetails = slice.getActions((slice: any) => slice.setAccountChainDetails);
  const networkId = store.getState((store: any) => store.networks.current.networkId);
  const getKeyList = store.getEffects((store: any) => store.accounts.getKeyList);

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
