import { effect } from '../../../../react-vault';
import { viewAccount } from '../../../helpers/rpc/viewAccount.ts';
import { toCamelCase } from "../../../helpers/toCamelCase.ts";

export const onMountAccount = effect(async ({ payload: accountId, store, slice }: any) => {
  const { rpc } = store.getState((store: any) => store.networks.current.url);
  const setAccountChainDetails = slice.getActions((slice: any) => slice.setAccountChainDetails);

  try {
    const response = await viewAccount(accountId, rpc);
    setAccountChainDetails({ accountId, details: toCamelCase(response.result) });
  } catch (e) {
    console.log(e);
  }
});
