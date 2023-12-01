import { effect } from "../../../react-vault";
import { connect } from "near-api-js";

const near = await connect({
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://testnet.mynearwallet.com',
});


export const onGetAccessKeyList =effect(async ({ payload, slice, store }: any) => {
  const {accountId} = payload
  const getAccessKeyList = slice.getActions((slice: any) => slice.getAccessKeyList);
  console.log(accountId);
  try {
    const response = await near.connection.provider.query({
      request_type: "view_access_key_list",
      finality: "final",
      account_id: accountId,
    });
    // console.log();
    getAccessKeyList(response)
  }catch (e){
    console.log(e);
  }
})