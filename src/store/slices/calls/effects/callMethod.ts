import { effect } from '../../../../react-vault';
import { JsonRpcProvider } from 'near-api-js/lib/providers';

function parseJsonFromRawResponse(response: Uint8Array): any {
  return JSON.parse(Buffer.from(response).toString());
}

export const callMethod = effect(async ({ payload: formValues, slice, store }: any) => {
  const { spaceId, networkId, url } = store.getState((store: any) => store.networks.current);
  const getKey = store.getEffects((store: any) => store.keys.getKey);

  try {
    const provider = new JsonRpcProvider({ url: url.rpc });

    const response: any = await provider.query({
      request_type: 'call_function',
      finality: 'final',
      account_id: formValues.contractId.value,
      method_name: formValues.method.value,
      args_base64: Buffer.from(formValues.arguments).toString('base64'),
    });

    const res = parseJsonFromRawResponse(response.result);
    console.log(res);
    //dad
  } catch (e) {
    console.log(e);
  }
});
