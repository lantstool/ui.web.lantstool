import { effect } from '../../../../../../../react-vault/index.js';

const convertStringValue = (value) => {
  return value === 'null' ? null : !isNaN(value) ? parseFloat(value) : value;
};

const getBodyType = (method, params, type) => {
  const bodyTypes = {
    view_code: type === 'view_code' && { ...params, account_id: params.account_id.value },
    view_state: type === 'view_state' && {
      ...params,
      account_id: params.account_id.value,
      prefix_base64: params.prefix_base64,
    },
    data_changes: type === 'data_changes' && {
      ...params,
      account_ids: [params.account_ids.value],
      key_prefix_base64: Buffer.from(params.key_prefix_base64).toString('base64'),
    },
    contract_code_changes: type === 'contract_code_changes' && {
      ...params,
      account_ids: [params.account_ids.value],
    },
    // call_function: type === 'call_function' && {
    //   ...params,
    //   account_id: params.account_id.value,
    //   args_base64: Buffer.from(params.args_base64).toString('base64'),
    // },
    view_access_key: type === 'view_access_key' && {
      ...params,
      account_id: params.account_id.value,
      public_key: params.public_key.value,
    },
    view_access_key_list: type === 'view_access_key_list' && {
      ...params,
      account_id: params.account_id.value,
    },
    single_access_key_changes: type === 'single_access_key_changes' && {
      ...params,
      keys: [{ account_id: params.account_id.value, public_key: params.public_key.value }],
    },
    all_access_key_changes: type === 'all_access_key_changes' && {
      ...params,
      account_ids: [params.account_ids.value],
    },
    view_account: type === 'view_account' && { ...params, account_id: params.account_id.value },
    account_changes: type === 'account_changes' && {
      ...params,
      account_ids: [params.account_ids.value],
    },
    block:
      type === 'block' &&
      (params.type === 'finality'
        ? { finality: params.finality }
        : { block_id: convertStringValue(params.block_id) }),
    EXPERIMENTAL_changes_in_block:
      type === 'EXPERIMENTAL_changes_in_block' &&
      (params.type === 'finality'
        ? { finality: params.finality }
        : { block_id: convertStringValue(params.block_id) }),
    chunk:
      type === 'chunk' &&
      (params.type === 'chunk_id'
        ? {
            chunk_id: params.chunk_id,
          }
        : { block_id: convertStringValue(params.block_id), shard_id: Number(params.shard_id) }),
    gas_price:
      type === 'gas_price' &&
      (params.type === 'block' ? [convertStringValue(params.block)] : [params.lastBlock]),
    EXPERIMENTAL_protocol_config:
      type === 'EXPERIMENTAL_protocol_config' &&
      (params.type === 'finality'
        ? { finality: params.finality }
        : { block_id: convertStringValue(params.block_id) }),
    status: type === 'status' && params,
    network_info: type === 'network_info' && params,
    validators:
      type === 'validators' &&
      (params.type === 'epoch_id'
        ? { epoch_id: params.epoch_id }
        : [convertStringValue(params.block_id)]),
    tx: type === 'tx' && {
      ...params,
      wait_until: params.wait_until.value,
    },
    EXPERIMENTAL_tx_status: type === 'EXPERIMENTAL_tx_status' && {
      ...params,
      wait_until: params.wait_until.value,
    },
    EXPERIMENTAL_receipt: type === 'EXPERIMENTAL_receipt' && params,
  };

  if (type === 'EXPERIMENTAL_genesis_config') return { jsonrpc: '2.0', id: 1, method };
  return { jsonrpc: '2.0', id: 1, method, params: bodyTypes[type] };
};

export const callMethod = effect(async ({ payload, slice, store }) => {
  const { callId, params, method, type } = payload;
  const { url } = store.getState((store) => store.networks.current);
  const addResult = slice.getActions((slice) => slice.addResult);
  const setOpenResult = slice.getActions((slice) => slice.setOpenResult);

  try {
    setOpenResult({ callId, isOpen: true, isLoading: true });
    const body = getBodyType(method, params, type.value);

    const response = await fetch(url.rpc, {
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
    console.log(e);
  }
});
