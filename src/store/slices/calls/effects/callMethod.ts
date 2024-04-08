import { effect } from '../../../../react-vault';
import { JsonRpcProvider } from 'near-api-js/lib/providers';

function parseJsonFromRawResponse(response: Uint8Array): any {
  return JSON.parse(Buffer.from(response).toString());
}

export const callMethod = effect(async ({ payload: formValues, slice, store }: any) => {
  const { spaceId, networkId, url } = store.getState((store: any) => store.networks.current);
  const getKey = store.getEffects((store: any) => store.keys.getKey);
  const call = slice.getState((slice: any) => slice.records[formValues.callId]);
  const putCall = slice.getActions((slice: any) => slice.putCall);

  try {
    const body = {
      jsonrpc: '2.0',
      id: 1,
      method: 'query',
      params: {
        request_type: 'call_function',
        finality: 'final',
        account_id: formValues.contractId.value,
        method_name: formValues.method,
        args_base64: Buffer.from(formValues.arguments).toString('base64'),
      },
    };

    const response: any = await fetch(url.rpc, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });

    const { result } = await response.json();

    if (result.result)
      return putCall({
        ...call,
        result: Buffer.from(result.result).toString(),
      });

    if (result.error)
      return putCall({
        ...call,
        result: result.error,
      });
  } catch (e) {
    console.log(e.message);
  }
});
