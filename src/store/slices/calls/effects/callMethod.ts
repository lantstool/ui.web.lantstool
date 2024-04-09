import { effect } from '../../../../react-vault';
import { JsonRpcProvider } from 'near-api-js/lib/providers';

function parseJsonFromRawResponse(response: Uint8Array): any {
  return JSON.parse(Buffer.from(response).toString());
}

export const callMethod = effect(async ({ payload: formValues, slice, store }: any) => {
  const { callId, contractId, method } = formValues;
  const { url } = store.getState((store: any) => store.networks.current);
  const addResult = slice.getActions((slice: any) => slice.addResult);
  const setOpenResult = slice.getActions((slice: any) => slice.setOpenResult);

  try {
    setOpenResult({ callId, isOpen: true, isLoading: true });

    const body = {
      jsonrpc: '2.0',
      id: 1,
      method: 'query',
      params: {
        request_type: 'call_function',
        finality: 'final',
        account_id: contractId.value,
        method_name: method,
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

    if (result.result) return addResult({ callId, result: Buffer.from(result.result).toString() });

    if (result.error) return addResult({ callId, result: { error: result.error } });
  } catch (e) {
    addResult({ callId, result: { error: e.message } });
    console.log(e.message);
  }
});
