import { effect } from '../../../../react-vault';

export const callViewMethod = effect(async ({ payload, slice, store }) => {
  const { callId, params } = payload;
  const { url } = store.getState((store) => store.networks.current);
  const addResult = slice.getActions((slice) => slice.addResult);
  const setOpenResult = slice.getActions((slice) => slice.setOpenResult);

  try {
    setOpenResult({ callId, isOpen: true, isLoading: true });

    const body = {
      jsonrpc: '2.0',
      id: 0,
      method: 'query',
      params: {
        request_type: 'call_function',
        finality: 'final',
        account_id: params.account_id.value,
        method_name: params.method_name,
        args_base64: Buffer.from(params.args_base64).toString('base64'),
      },
    };

    const response = await fetch(url.rpc, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });

    const { result, error } = await response.json();

    if (result)
      return addResult({
        callId,
        result: {
          result: {
            ...result,
            result: JSON.parse(Buffer.from(result.result).toString()),
          },
        },
      });

    if (error) return addResult({ callId, result: { error: error.data } });
  } catch (e) {
    addResult({ callId, result: { error: e.message } });
    console.log(e);
  }
});
