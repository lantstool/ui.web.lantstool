import { effect } from '../../../../react-vault';

export const callMethod = effect(async ({ payload: formValues, slice, store }: any) => {
  const { callId, params, method } = formValues;
  const { url } = store.getState((store: any) => store.networks.current);
  const addResult = slice.getActions((slice: any) => slice.addResult);
  const setOpenResult = slice.getActions((slice: any) => slice.setOpenResult);
  console.log(formValues)
  try {
    setOpenResult({ callId, isOpen: true, isLoading: true });

    const body = { jsonrpc: '2.0', id: 1, method, params: {} };
    if (params.account_id) {
      body.params = { ...params, account_id: params.account_id.value };
    }
    if (params.account_ids) {
      body.params = { ...params, account_ids: [params.account_ids.value] };
    }
    if (params.args_base64) {
      body.params = {
        ...params,
        account_id: params.account_id.value,
        args_base64: Buffer.from(params.args_base64).toString('base64'),
      };
    } else {
      body.params = { ...params };
    }
    // arg_base64 Buffer.from(formValues.arguments).toString('base64'),
    console.log(body);
    const response: any = await fetch(url.rpc, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });

    const { result, error } = await response.json();

    if (result) return addResult({ callId, result: { result } });

    if (error) return addResult({ callId, result: { error: error.data } });
  } catch (e) {
    addResult({ callId, result: { error: e.message } });
    console.log(e.message);
  }
});
