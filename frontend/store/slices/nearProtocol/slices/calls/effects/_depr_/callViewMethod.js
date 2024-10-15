import { effect } from '../../../../../../../../react-vault/index.js';
import { fetchJson } from '../../../../../../helpers/fetchJson.js';
import { decompress } from 'fzstd';

const setABItoResult = (callId, result, addResult) => {
  const raw = decompress(new Uint8Array(result.result));
  const json = new TextDecoder().decode(raw);
  const res = JSON.parse(json);

  addResult({
    callId,
    result: {
      result: {
        ...result,
        result: res,
      },
    },
  });
};

export const callViewMethod = effect(async ({ payload, slice, store }) => {
  const { callId, params } = payload;
  const { url } = store.getState((store) => store.networks.current);
  const addResult = slice.getActions((slice) => slice.addResult);
  const setOpenResult = slice.getActions((slice) => slice.setOpenResult);

  try {
    setOpenResult({ callId, isOpen: true, isLoading: true });

    const methodName = params.method_name.value;

    // TODO: refactor and move to helpers
    const { result, error } = await fetchJson(url.rpc, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 0,
        method: 'query',
        params: {
          request_type: 'call_function',
          finality: 'final',
          account_id: params.account_id.value,
          method_name: methodName,
          args_base64: Buffer.from(params.args_base64).toString('base64'),
        },
      }),
    });

    if (methodName === '__contract_abi' && result) return setABItoResult(callId, result, addResult);

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
