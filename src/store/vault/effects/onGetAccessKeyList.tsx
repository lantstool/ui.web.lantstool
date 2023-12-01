import { effect } from "../../../react-vault";
import {JsonRpcProvider} from "near-api-js/lib/providers";


export const onGetAccessKeyList =effect(async ({ payload, slice }: any) => {
  const {accountId} = payload
  const getAccessKeyList = slice.getActions((slice: any) => slice.getAccessKeyList);

  try {
    const provider = new JsonRpcProvider({ url: `https://rpc.testnet.near.org` });

    const response = await provider.query({
      request_type: "view_access_key_list",
      finality: "final",
      account_id: accountId,
    });

    getAccessKeyList(response)
  }catch (e){
    console.log(e);
  }
})