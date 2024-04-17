export const methods = [
  {
    type: 'view_code',
    text: 'View contract code',
    method: 'query',
    params: {
      request_type: 'view_code',
      finality: 'final', //final
      account_id: '',
    },
  },
  {
    type: 'view_state',
    text: 'View contract state',
    method: 'query',
    params: {
      request_type: 'view_state',
      finality: 'final', //final
      account_id: '',
      prefix_base64: '',
    },
  },
  {
    type: 'data_changes',
    text: 'View contract state changes',
    method: 'EXPERIMENTAL_changes',
    params: {
      changes_type: 'data_changes',
      account_ids: [], //['guest-book.testnet']
      key_prefix_base64: '',
      block_id: '',
    },
  },
  {
    type: 'contract_code_changes',
    text: 'View contract code changes',
    method: 'EXPERIMENTAL_changes',
    params: {
      changes_type: 'contract_code_changes',
      account_ids: [], //['dev-1602714453032-7566969']
      block_id: '',
    },
  },
  {
    type: 'call_function',
    text: 'Call a contract function',
    method: 'query',
    params: {
      request_type: 'call_function',
      finality: 'final', //final
      account_id: '',
      method_name: '',
      args_base64: '',
    },
  },
];
